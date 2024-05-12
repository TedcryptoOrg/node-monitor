import { type ApiConfiguration } from './ApiConfiguration'
import { type ApiServer } from './ApiServer'

export interface ApiMetric {
  configuration: ApiConfiguration
  server: ApiServer
  freeDiskSpace: number
  usedDiskSpace: number
  totalDiskSpace: number
  usedDiskSpacePercentage: number
  memoryUsage: number
  memoryUsagePercentage: number
  totalMemory: number
}
