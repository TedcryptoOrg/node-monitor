import axios from "axios";
import {ApiConfiguration} from "../type/api/ApiConfiguration";
import {ApiMonitor} from "../type/api/ApiMonitor";
import {ApiServer} from "../type/api/ApiServer";

export class ConfigurationManager {
    async getAllConfigurations(): Promise<ApiConfiguration[]> {
        return (await axios.get('http://localhost:3002/api/configurations')).data;
    }

    async getMonitors(configurationId: number): Promise<ApiMonitor[]> {
        return (await axios.get(`http://localhost:3002/api/configurations/${configurationId}/monitors`)).data;
    }

    async getServers(id: number): Promise<ApiServer[]> {
        return (await axios.get(`http://localhost:3002/api/configurations/${id}/servers`)).data;
    }
}