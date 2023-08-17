export interface NodeExporterConfiguration {
  address: string
  enabled: boolean
  alerts?: {
    diskSpace?: {
      enabled: boolean
      threshold: number
      alert_sleep_duration_minutes: number
      check_interval_seconds: number
    }
  }
}
