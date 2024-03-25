import {ApiMetric} from "./Types/ApiMetric";
import {injectable} from "inversify";

@injectable()
export default class TedcryptoApiClient {
    constructor(
        private readonly baseUrl: string,
    ) {
    }

    async getServerMetrics(serverId: number): Promise<ApiMetric> {
        const metricsResponse = await fetch(`${this.baseUrl}/api/servers/${serverId}/metrics`);

        return await metricsResponse.json();
    }
}
