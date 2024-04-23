import type NotificationChannel from './NotificationChannel'

export default interface NotificationChannelRepository {
  /**
     * @throws RecordNotFound
     */
  get: (id: number) => Promise<NotificationChannel>

  findAll: (isEnabled?: boolean) => Promise<NotificationChannel[]>

  upsert: (notificationChannel: NotificationChannel) => Promise<NotificationChannel>

  delete: (id: number) => Promise<void>
}
