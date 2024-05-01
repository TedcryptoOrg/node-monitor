import request = require("supertest");
import User from "../../src/Domain/User/User";
import {createUser} from "./StaticFixtures";
import {server} from "../../src/Infrastructure/Http/Server";
import {createUserToken} from "./SecurityHelper";

export default class SuperTestRequestBuilder {
    constructor(
        private path: string,
        private method: string = 'get',
        private data: any = undefined,
        private isAuthenticated: boolean = false,
        private user: User|undefined = undefined,
        private authenticationToken: string|undefined = undefined
    ) {}

    static get(path: string, isAuthenticated?: boolean): SuperTestRequestBuilder {
        return new SuperTestRequestBuilder(path, 'get', undefined, isAuthenticated ?? false);
    }

    static post(path: string, data?: any, isAuthenticated?: boolean): SuperTestRequestBuilder {
        return new SuperTestRequestBuilder(path, 'post', data, isAuthenticated ?? false);
    }

    static put(path: string, data?: any, isAuthenticated?: boolean): SuperTestRequestBuilder {
        return new SuperTestRequestBuilder(path, 'put', data, isAuthenticated ?? false);
    }

    static delete(path: string, isAuthenticated?: boolean): SuperTestRequestBuilder {
        return new SuperTestRequestBuilder(path, 'delete', undefined, isAuthenticated ?? false);
    }

    public withPath(path: string): SuperTestRequestBuilder {
        this.path = path;
        return this;
    }

    public withMethod(method: string): SuperTestRequestBuilder {
        this.method = method;
        return this;
    }

    public withData(data: any): SuperTestRequestBuilder {
        this.data = data;
        return this;
    }

    public withIsAuthenticated(isAuthenticated: boolean): SuperTestRequestBuilder {
        this.isAuthenticated = isAuthenticated;
        return this;
    }

    public withAuthenticationToken(authenticationToken: string): SuperTestRequestBuilder {
        this.isAuthenticated = true;
        this.authenticationToken = authenticationToken;
        return this;
    }

    public withUser(user: User): SuperTestRequestBuilder {
        this.user = user;
        return this;
    }

    public async build(): Promise<any> {
        // @ts-ignore
        let superRequest = request(server)[this.method](this.path);
        if (this.isAuthenticated) {
            if (this.authenticationToken) {
                superRequest = superRequest.set('Authorization', this.authenticationToken);
            } else {
                if (this.user === undefined) {
                    this.user = await createUser();
                }
                superRequest = superRequest.set('Authorization', createUserToken(this.user).accessToken.token);
            }
        }
        if (this.data) {
            superRequest = superRequest.send(this.data);
        }

        return superRequest
    }
}