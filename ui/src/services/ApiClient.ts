import {UserState} from "../stores/useUserStore";

export default class ApiClient {
    base_url: string;

    constructor(
        private readonly userStore: UserState,
        api_host: string
    ) {
        this.base_url =  api_host + '/api';
    }

    async request(options: { query: string, method: string, headers?: any, body?: any, url: string}) {
        let query = new URLSearchParams(options.query || {}).toString();
        if (query !== '') {
            query = '?' + query;
        }

        let accessToken = this.userStore.securityTokens?.accessToken;

        if (this.userStore.securityTokens && (!options.headers || !options.headers.Authorization)) {
            if (this.userStore.securityTokens.accessTokenExpiresAt.toTimeString() <= new Date().toTimeString()) {
                console.debug('Access token expired... refreshing')
                // Refresh token
                const response = await this.post('/refresh', undefined, {
                    headers: {
                        'Authorization': this.userStore.securityTokens.refreshToken,
                    }
                })
                const apiSecurityTokens = this.userStore.handleLoginResponse(response);
                accessToken = apiSecurityTokens.accessToken;
            }

            options.headers = {
                ...options.headers,
                'Authorization': accessToken,
            };
        }

        let response;
        try {
            // @ts-ignore
            response = await fetch(this.base_url + options.url + query, {
                method: options.method,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                body: options.body ? JSON.stringify(options.body) : null,
            });
        } catch (error: any) {
            response = {
                ok: false,
                status: 500,
                json: async () => { return {
                    code: 500,
                    message: 'The server is unresponsive',
                    description: error.toString(),
                }; }
            };
        }

        let body = null;
        try {
            body = await response.json();
        } catch (error) {
            // Ignore
        }

        return {
            ok: response.ok,
            status: response.status,
            body: body
        };
    }

    async get(url: string, query?: string, options?: any) {
        return this.request({method: 'GET', url, query, ...options});
    }

    async post(url: string, body: any, options?: any) {
        return this.request({method: 'POST', url, body, ...options});
    }

    async put(url: string, body: any, options?: any) {
        return this.request({method: 'PUT', url, body, ...options});
    }

    async delete(url: string, options?: any) {
        return this.request({method: 'DELETE', url, ...options});
    }
}