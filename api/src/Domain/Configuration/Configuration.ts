import Monitor, { type MonitorArray } from '../Monitor/Monitor'
import Server, { type ServerArray } from '../Server/Server'
import ConfigurationNotification, { type ConfigurationNotificationArray } from './ConfigurationNotification'

export interface ConfigurationArray {
  name: string
  chain: string
  is_enabled: boolean
  monitors?: MonitorArray[]
  servers?: ServerArray[]
  notification_channels?: ConfigurationNotificationArray[]
  id?: number
  createdAt?: Date
  updatedAt?: Date
}

export default class Configuration {
  constructor (
    public name: string,
    public chain: string,
    public is_enabled: boolean,
    public monitors?: Monitor[],
    public servers?: Server[],
    public notification_channels?: ConfigurationNotification[],
    public id?: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
  }

  static fromArray (array: ConfigurationArray): Configuration {
    return new Configuration(
      array.name,
      array.chain,
      array.is_enabled,
      array.monitors?.map(monitor => Monitor.fromArray(monitor)),
      array.servers?.map(server => Server.fromArray(server)),
      array.notification_channels?.map(notificationChannel => ConfigurationNotification.fromArray(notificationChannel)),
      array.id,
      array.createdAt,
      array.updatedAt
    )
  }

  toArray (): ConfigurationArray {
    return {
      name: this.name,
      chain: this.chain,
      is_enabled: this.is_enabled,
      monitors: this.monitors?.map(monitor => monitor.toArray()),
      servers: this.servers?.map(server => server.toArray()),
      notification_channels: this.notification_channels?.map(notificationChannel => notificationChannel.toArray()),
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
