import type Configuration from './Configuration/Configuration'
import type Monitor from './Monitor/Monitor'
import type Server from './Server/Server'

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
  getConfigurations(): Promise<Configuration[]>

  getMonitor(id: number): Promise<Monitor>

  getServerMetrics(serverId: number): Promise<ServerMetricsResponse>

  pingMonitor(id: number, payload: { last_error: string | null, status: boolean }): Promise<void>

  getConfigurationServers(configurationId: number): Promise<Server[]>
}
