import type Command from '../../../../Domain/Command/Command'
import type NotificationChannel from '../../../../Domain/NotificationChannel/NotificationChannel'

export default class TestNotificationChannelCommand implements Command {
  constructor (
    public readonly notificationChannel: NotificationChannel
  ) {
  }
}
