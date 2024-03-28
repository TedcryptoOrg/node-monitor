import Configuration from "./Configuration/Configuration";
import Monitor from "./Monitor/Monitor";

export interface ServerMetricsResponse {
  freeDiskSpace: number
  usedDiskSpace: number
  totalDiskSpace: number
  usedDiskSpacePercentage: number
  memoryUsage: number
  memoryUsagePercentage: number
  totalMemory: number
}

export default interface ApiClient {
  getConfigurations: () => Promise<Configuration[]>

  getMonitor: (id: number) => Promise<Monitor>

  getServerMetrics: (serverId: number) => Promise<ServerMetricsResponse>

  pingMonitor: (id: number, payload: { last_error: string | null, status: boolean }) => any
}
