import { ServerMetrics } from "../../src/Domain/Server/ServerMetrics";
import ServerMetricsExporter from "../../src/Domain/Server/ServerMetricsExporter";

export default class InMemoryServerMetricsExporter implements ServerMetricsExporter {
    private metrics: Map<string, ServerMetrics> = new Map<string, ServerMetrics>();

    addMetrics(address: string, metrics: ServerMetrics): void {
        this.metrics.set(address, metrics);
    }

    async getMetrics(address: string): Promise<ServerMetrics> {
        return Promise.resolve(this.metrics.get(address) as ServerMetrics);
    }
}
