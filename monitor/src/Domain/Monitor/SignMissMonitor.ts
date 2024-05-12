import type Monitor from './Monitor'
import type Configuration from '../Configuration/Configuration'
import { type MonitorType } from './MonitorType'

export default class SignMissMonitor implements Monitor {
  constructor (
    public readonly id: number,
    public readonly name: string,
    public readonly type: MonitorType,
    public readonly configuration: Configuration,
    public readonly alertSleepDurationMinutes: number,
    public readonly checkIntervalSeconds: number,
    public readonly isEnabled: boolean,
    public readonly missTolerance: number,
    public readonly missToleranceIntervalSeconds: number,
    public readonly valoperAddress: string
  ) {
  }

  getFullName (): string {
    return `[Configuration: ${this.configuration.name}(${this.configuration.id})]` +
            `[Monitor: ${this.name}(${this.type.toString()})(${this.id})]`
  }
}
