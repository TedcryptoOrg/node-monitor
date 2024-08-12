import type { ServerMetrics } from './ServerMetrics'

export default interface ServerMetricsExporter {
  getMetrics: (address: string) => Promise<ServerMetrics>
}
