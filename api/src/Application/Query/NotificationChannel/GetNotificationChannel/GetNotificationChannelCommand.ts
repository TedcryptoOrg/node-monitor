import type Command from '../../../../Domain/Command/Command'

export default class GetNotificationChannelCommand implements Command {
  constructor (
    public readonly id: number
  ) {}
}
