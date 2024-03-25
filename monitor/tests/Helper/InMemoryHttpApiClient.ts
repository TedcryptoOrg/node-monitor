import ApiClient, {ServerMetricsResponse} from "../../src/Domain/ApiClient";

export default class InMemoryHttpApiClient implements ApiClient {
    serverMetrics: Map<number, ServerMetricsResponse> = new Map<number, ServerMetricsResponse>();

    addServerMetrics(serverId: number, metrics: ServerMetricsResponse) {
        this.serverMetrics.set(serverId, metrics);
    }

    async getServerMetrics(serverId: number): Promise<ServerMetricsResponse> {
        if (!this.serverMetrics.has(serverId)) {
            throw new Error(`Server with id ${serverId} not found`);
        }

        return this.serverMetrics.get(serverId) as ServerMetricsResponse;
    }
}
