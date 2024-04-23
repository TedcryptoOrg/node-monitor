import Configuration, { type ConfigurationArray } from '../Configuration/Configuration'
import Server, { type ServerArray } from '../Server/Server'
import { type MonitorType } from './MonitorType'

export interface MonitorArray {
  name: string
  type: string
  is_enabled: boolean
  configuration_object: string
  id?: number
  configuration?: ConfigurationArray
  server?: ServerArray | null
  last_check?: Date | null
  status?: boolean
  last_error?: string | null
  errored_at?: Date | null
  createdAt?: Date
  updatedAt?: Date
}

export default class Monitor {
  constructor (
    public name: string,
    public type: MonitorType,
    public isEnabled: boolean,
    public configurationObject: object,
    public id?: number,
    public configuration?: Configuration,
    public server?: Server,
    public lastCheck?: Date | null,
    public status?: boolean,
    public lastError?: string | null,
    public erroredAt?: Date | null,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
  }

  static fromArray (array: MonitorArray): Monitor {
    return new Monitor(
      array.name,
      array.type as MonitorType,
      array.is_enabled,
      JSON.parse(array.configuration_object) as object,
      array.id,
      array.configuration !== undefined && array.configuration !== null
        ? Configuration.fromArray(array.configuration)
        : undefined,
      array.server !== undefined && array.server !== null
        ? Server.fromArray(array.server)
        : undefined,
      array.last_check,
      array.status,
      array.last_error,
      array.errored_at,
      array.createdAt,
      array.updatedAt
    )
  }

  toArray (): MonitorArray {
    return {
      name: this.name,
      type: this.type,
      is_enabled: this.isEnabled,
      configuration_object: JSON.stringify(this.configurationObject),
      id: this.id,
      configuration: this.configuration?.toArray(),
      server: this.server?.toArray(),
      last_check: this.lastCheck,
      status: this.status,
      last_error: this.lastError,
      errored_at: this.erroredAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
