import Configuration, { type ConfigurationArray } from '../Configuration/Configuration'
import Service, { type ServiceArray } from '../Service/Service'

export interface ServerArray {
  name: string
  address: string
  is_enabled: boolean
  configuration?: ConfigurationArray
  services?: ServiceArray[]
  id?: number
  createdAt?: Date
  updatedAt?: Date
}

export default class Server {
  constructor (
    public readonly name: string,
    public readonly address: string,
    public readonly isEnabled: boolean,
    public readonly configuration?: Configuration,
    public readonly services?: Service[],
    public readonly id?: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {
  }

  public static fromArray (server: ServerArray): Server {
    return new Server(
      server.name,
      server.address,
      server.is_enabled,
      server.configuration !== undefined ? Configuration.fromArray(server.configuration) : undefined,
      server.services !== undefined ? server.services.map((service) => Service.fromArray(service)) : undefined,
      server.id,
      server.createdAt,
      server.updatedAt
    )
  }

  public toArray (): ServerArray {
    return {
      name: this.name,
      address: this.address,
      is_enabled: this.isEnabled,
      configuration: this.configuration?.toArray(),
      services: this.services?.map((service) => service.toArray()),
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
