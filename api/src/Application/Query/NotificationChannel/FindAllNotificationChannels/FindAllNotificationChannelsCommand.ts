import type Command from '../../../../Domain/Command/Command'

export default class FindAllNotificationChannelsCommand implements Command {
  constructor (
    public readonly onlyActive?: boolean
  ) {
  }
}
