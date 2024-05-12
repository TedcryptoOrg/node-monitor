import type Configuration from '../Configuration/Configuration'
import { type MonitorType } from './MonitorType'

export default interface Monitor {
  id: number
  name: string
  type: MonitorType
  configuration: Configuration
  alertSleepDurationMinutes: number
  isEnabled: boolean
  checkIntervalSeconds: number

  getFullName: () => string
}
