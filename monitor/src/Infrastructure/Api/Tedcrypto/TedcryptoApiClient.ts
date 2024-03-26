import {ApiMetric} from "./Types/ApiMetric";
import {injectable} from "inversify";
import axios from "axios";

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
}
