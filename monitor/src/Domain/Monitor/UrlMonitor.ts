import type Monitor from './Monitor'
import type { MonitorType } from './MonitorType'
import type Configuration from '../Configuration/Configuration'

export default class UrlMonitor implements Monitor {
  constructor (
    public readonly id: number,
    public readonly name: string,
    public readonly type: MonitorType,
    public readonly configuration: Configuration,
    public readonly alertSleepDurationMinutes: number,
    public readonly checkIntervalSeconds: number,
    public readonly isEnabled: boolean,
    public readonly url: string,
    public readonly allowedAttempts: number,
  ) {
  }

  getFullName (): string {
    return `[Configuration: ${this.configuration.name}(${this.configuration.id})]` +
            `[Monitor: ${this.name}(${this.type.toString()})(${this.id})]`
  }
}
