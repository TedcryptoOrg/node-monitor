import type NotificationChannel from '../NotificationChannel'
import type NotificationChannelClient from './NotificationChannelClient'

export default interface NotificationChannelClientFactory {
  createClient: (notificationChannel: NotificationChannel) => NotificationChannelClient
}
