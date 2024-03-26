import ApiClient, {ServerMetricsResponse} from "../../Domain/ApiClient";
import TedcryptoApiClient from "./Tedcrypto/TedcryptoApiClient";
import {inject, injectable} from "inversify";

@injectable()
export class HttpApiClient implements ApiClient {
    constructor(
        @inject(TedcryptoApiClient) private readonly provider: TedcryptoApiClient
    ) {
    }

    async getServerMetrics(serverId: number): Promise<ServerMetricsResponse> {
        return await this.provider.getServerMetrics(serverId);
    }

    async pingMonitor(id: any, payload: {last_error: string|null; status: boolean}): Promise<void> {
        await this.provider.pingMonitor(id, payload);
    }
}
