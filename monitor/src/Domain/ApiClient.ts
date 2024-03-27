import Configuration from "./Configuration/Configuration";

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

  getServerMetrics: (serverId: number) => Promise<ServerMetricsResponse>

  pingMonitor: (id: number, payload: { last_error: string | null, status: boolean }) => any
}
