import {ApiServer} from "../type/api/ApiServer";
import {ApiService} from "../type/api/ApiService";
import axios from "axios";

export class ServersManager {
    async getServices(server: ApiServer): Promise<ApiService[]> {
        return (await axios.get(`http://localhost:3002/api/servers/${server.id}/services`)).data;
    }
}