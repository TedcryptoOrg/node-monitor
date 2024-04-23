import Server, { type ServerArray } from '../Server/Server'
import { type ServiceType } from './ServiceType'

export interface ServiceArray {
  name: string
  address: string
  is_enabled: boolean
  type: string
  server?: ServerArray
  id?: number
}

export default class Service {
  constructor (
    public name: string,
    public address: string,
    public isEnabled: boolean,
    public type: ServiceType,
    public server?: Server,
    public id?: number
  ) {
  }

  static fromArray (array: ServiceArray): Service {
    return new Service(
      array.name,
      array.address,
      array.is_enabled,
      array.type as ServiceType,
      array.server !== undefined ? Server.fromArray(array.server) : undefined,
      array.id
    )
  }

  toArray (): ServiceArray {
    return {
      name: this.name,
      address: this.address,
      is_enabled: this.isEnabled,
      type: this.type,
      server: this.server?.toArray(),
      id: this.id
    }
  }
}
