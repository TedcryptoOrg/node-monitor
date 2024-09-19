import type { ApiMonitorTypeEnum } from './ApiMonitorTypeEnum'
import type { ApiConfiguration } from './ApiConfiguration'
import type { ApiServer } from './ApiServer'

export interface BlockAlertConfiguration {
  miss_tolerance: number
  miss_tolerance_period_seconds: number
  sleep_duration_seconds: number
  alert_sleep_duration_minutes: number
}

export interface NodeExporterDiskSpaceUsageConfiguration {
  threshold: number
  alert_sleep_duration_minutes: number
  check_interval_seconds: number
}

export interface PriceFeederMissCountConfiguration {
  miss_tolerance: number
  miss_tolerance_period_seconds: number
  sleep_duration_seconds: number
  alert_sleep_duration_minutes: number
  valoper_address: string
}

export interface UrlCheckConfiguration {
  name: string
  address: string
  alert_sleep_duration_minutes?: number
  allowed_attempts?: number // @TODO: Optional just while we are not setting it for everyone
}

export interface SignMissCheckConfiguration {
  miss_tolerance: number
  miss_tolerance_period_seconds: number
  sleep_duration_seconds: number
  alert_sleep_duration_minutes: number
  valoper_address: string
}

export interface ApiMonitor {
  id?: number
  name: string
  type: ApiMonitorTypeEnum
  is_enabled: boolean
  configuration: ApiConfiguration
  server: ApiServer | undefined
  configuration_object: string
  status?: boolean
  last_check?: Date
  last_error?: string
}
