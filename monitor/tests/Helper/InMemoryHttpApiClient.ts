import ApiClient, {ServerMetricsResponse} from "../../src/Domain/ApiClient";
import Configuration from "../../src/Domain/Configuration/Configuration";

export default class InMemoryHttpApiClient implements ApiClient {
    serverMetrics: Map<number, ServerMetricsResponse> = new Map<number, ServerMetricsResponse>();
    pingMonitors: Map<number, { last_error: string|null; status: boolean; }> = new Map<number, { last_error: string; status: boolean; }>();

    async pingMonitor(id: number, payload: { last_error: string|null; status: boolean; }): Promise<void> {
        this.pingMonitors.set(id, payload);
    }

    async getConfigurations(): Promise<Configuration[]> {
        throw new Error("Method not implemented.");
    }

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
