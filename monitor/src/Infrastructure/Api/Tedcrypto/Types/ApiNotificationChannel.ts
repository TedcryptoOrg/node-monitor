import { type NotificationChannelTypeEnum } from './NotificationChannelType'

export interface ApiNotificationChannel {
  id: number
  type: NotificationChannelTypeEnum
  name: string
  configuration_object: object
  is_enabled: boolean
  created_at?: Date
  updated_at?: Date
}
