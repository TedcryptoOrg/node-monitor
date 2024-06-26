import Configuration, { type ConfigurationArray } from '../Configuration/Configuration'
import Monitor, { type MonitorArray } from '../Monitor/Monitor'
import Server, { type ServerArray } from '../Server/Server'

export interface AuditArray {
  message: string
  configuration?: ConfigurationArray | null
  monitor?: MonitorArray | null
  server?: ServerArray | null
  id?: number
  created_at?: Date
}
export default class Audit {
  constructor (
    public configuration: Configuration | null,
    public server: Server | null,
    public monitor: Monitor | null,
    public message: string,
    public id?: number,
    public createdAt?: Date
  ) {}

  static fromArray (audit: AuditArray): Audit {
    return new Audit(
      audit.configuration !== undefined && audit.configuration !== null ? Configuration.fromArray(audit.configuration) : null,
      audit.server !== undefined && audit.server !== null ? Server.fromArray(audit.server) : null,
      audit.monitor !== undefined && audit.monitor !== null ? Monitor.fromArray(audit.monitor) : null,
      audit.message,
      audit.id,
      audit.created_at
    )
  }

  toArray (): AuditArray {
    return {
      monitor: this.monitor?.toArray() ?? null,
      server: this.server?.toArray() ?? null,
      configuration: this.configuration?.toArray() ?? null,
      message: this.message,
      id: this.id,
      created_at: this.createdAt
    }
  }
}
