import ApiClient, {ServerMetricsResponse} from "../../src/Domain/ApiClient";
import Configuration from "../../src/Domain/Configuration/Configuration";
import Monitor from "../../src/Domain/Monitor/Monitor";

export default class InMemoryHttpApiClient implements ApiClient {
    monitors: Map<number, Monitor> = new Map<number, Monitor>();
    serverMetrics: Map<number, ServerMetricsResponse> = new Map<number, ServerMetricsResponse>();
    pingMonitors: Map<number, { last_error: string|null; status: boolean; }> = new Map<number, { last_error: string; status: boolean; }>();

    async pingMonitor(id: number, payload: { last_error: string|null; status: boolean; }): Promise<void> {
        this.pingMonitors.set(id, payload);
    }

    addMonitor(monitor: Monitor): void {
        this.monitors.set(monitor.id, monitor);
    }

    async getMonitor(id: number): Promise<Monitor> {
        if (!this.monitors.has(id)) {
            throw new Error(`Monitor with id ${id} not found. Did you forget to add it?`);
        }

        return this.monitors.get(id) as Monitor;
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
