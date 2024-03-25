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
  getServerMetrics: (serverId: number) => Promise<ServerMetricsResponse>
}
