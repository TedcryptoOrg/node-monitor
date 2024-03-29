import {HttpClient} from "../../Domain/Http/HttpClient";
import axios from "axios";
import {injectable} from "inversify";

@injectable()
export default class AxiosHttpClient implements HttpClient {
    async get(url: string): Promise<any> {
        return (await axios.get(url)).data;
    }

    async post(url: string, body: any): Promise<any> {
        return (await axios.post(url, body)).data;
    }

    async put(url: string, body: string): Promise<any> {
        return (await axios.put(url, body)).data;
    }

    async delete(url: string): Promise<any> {
        return (await axios.delete(url)).data;
    }

}