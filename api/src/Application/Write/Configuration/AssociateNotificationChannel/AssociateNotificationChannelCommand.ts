import type Command from '../../../../Domain/Command/Command'

export default class AssociateNotificationChannelCommand implements Command {
  constructor (
    public readonly configurationId: number,
    public readonly notificationChannelId: number
  ) {}
}
