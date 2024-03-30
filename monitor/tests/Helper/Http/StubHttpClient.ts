import {HttpClient} from "../../../src/Domain/Http/HttpClient";

export default class StubHttpClient implements HttpClient {
    private responses = new Map<string, any>();
    private requests: {"get": string[], "post": string[], "put": string[], "delete": string[]} = {
        "get": [],
        "post": [],
        "put": [],
        "delete": []
    };

    addResponse(httpVerb: "get"|"post"|"put"|"delete", url: string, response: any): void {
        this.responses.set(`${httpVerb}:${url}`, response);
    }

    getRequests(): {"get": string[], "post": string[], "put": string[], "delete": string[]} {
        return this.requests;
    }

    async get(url: string): Promise<any> {
        this.requests.get.push(url)
        const response = this.responses.get(`get:${url}`)
        if (!response) {
            return undefined
        }

        return response;
    }

    async post(url: string, body?: any): Promise<any> {
        this.requests.post.push(url)
        const response = this.responses.get(`post:${url}`)
        if (!response) {
            return undefined
        }

        return response;
    }

    async put(url: string, body?: any): Promise<any> {
        this.requests.put.push(url)
        const response = this.responses.get(`put:${url}`)
        if (!response) {
            return undefined
        }

        return response;
    }

    async delete(url: string): Promise<any> {
        this.requests.delete.push(url)
        const response = this.responses.get(`delete:${url}`)
        if (!response) {
            return undefined
        }

        return response;
    }
}
