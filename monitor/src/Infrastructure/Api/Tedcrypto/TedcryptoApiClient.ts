import {ApiMetric} from "./Types/ApiMetric";
import {injectable} from "inversify";
import axios from "axios";
import {ApiConfiguration} from "./Types/ApiConfiguration";
import {ApiMonitor} from "./Types/ApiMonitor";
import {ApiServer} from "./Types/ApiServer";

@injectable()
export default class TedcryptoApiClient {
    constructor(
        private readonly baseUrl: string,
    ) {
    }

    async getServerMetrics(serverId: number): Promise<ApiMetric> {
        return (await axios.get(`${this.baseUrl}/api/servers/${serverId}/metrics`)).data
    }

    async pingMonitor(id: number, payload: {last_error: string|null; status: boolean}): Promise<void> {
        await axios.post(`${this.baseUrl}/api/monitors/${id}/ping`, payload)
    }

    async getConfigurations(): Promise<ApiConfiguration[]> {
        return (await axios.get(`${this.baseUrl}/api/configurations`)).data
    }

    async getConfigurationMonitors(configurationId: number) {
        return (await axios.get(`${this.baseUrl}/api/configurations/${configurationId}/monitors`)).data
    }

    async getMonitor(monitorId: number): Promise<ApiMonitor> {
        return (await axios.get(`${this.baseUrl}/api/monitors/${monitorId}`)).data
    }

    async getConfigurationServers(configurationId: number): Promise<ApiServer[]> {
        return (await axios.get(`${this.baseUrl}/api/configurations/${configurationId}/servers`)).data
    }
}
