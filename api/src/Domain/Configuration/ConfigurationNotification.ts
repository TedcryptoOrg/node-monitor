import Configuration, { type ConfigurationArray } from './Configuration'
import NotificationChannel, { type NotificationChannelArray } from '../NotificationChannel/NotificationChannel'

export interface ConfigurationNotificationArray {
  configuration?: ConfigurationArray
  notification_channel?: NotificationChannelArray
  id?: number
  created_at?: Date
  updated_at?: Date
}

export default class ConfigurationNotification {
  constructor (
    public configuration?: Configuration,
    public notificationChannel?: NotificationChannel,
    public id?: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
  }

  static fromArray (array: ConfigurationNotificationArray): ConfigurationNotification {
    return new ConfigurationNotification(
      array.configuration ? Configuration.fromArray(array.configuration) : undefined,
      array.notification_channel ? NotificationChannel.fromArray(array.notification_channel) : undefined,
      array.id,
      array.created_at,
      array.updated_at
    )
  }

  toArray (): ConfigurationNotificationArray {
    return {
      configuration: this.configuration?.toArray(),
      notification_channel: this.notificationChannel?.toArray(),
      id: this.id,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    }
  }
}
