import type { NotificationChannelType } from './NotificationChannelType'

export interface NotificationChannelArray {
  name: string
  type: string
  configuration_object: string
  is_enabled: boolean
  id?: number
  created_at?: Date
  updated_at?: Date
}

export default class NotificationChannel {
  constructor (
    public readonly name: string,
    public readonly type: NotificationChannelType,
    public readonly configurationObject: object,
    public readonly isEnabled: boolean,
    public readonly id?: number,
    public readonly created_at?: Date,
    public readonly updated_at?: Date
  ) {}

  static fromArray (array: NotificationChannelArray): NotificationChannel {
    return new NotificationChannel(
      array.name,
      array.type as NotificationChannelType,
      JSON.parse(array.configuration_object) as object,
      array.is_enabled,
      array.id,
      array.created_at,
      array.updated_at
    )
  }

  toArray (): NotificationChannelArray {
    return {
      name: this.name,
      type: this.type,
      configuration_object: JSON.stringify(this.configurationObject),
      is_enabled: this.isEnabled,
      id: this.id,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}
