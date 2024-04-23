import type Command from '../../../../Domain/Command/Command'
import { type NotificationChannelType } from '../../../../Domain/NotificationChannel/NotificationChannelType'

export default class UpsertNotificationChannelCommand implements Command {
  constructor (
    public readonly name: string,
    public readonly type: NotificationChannelType,
    public readonly configurationObject: string,
    public readonly isEnabled: boolean,
    public readonly id?: number
  ) {
  }
}
