import type Command from '../../../../Domain/Command/Command'

export default class FindAllServicesCommand implements Command {
  constructor (
    public readonly serverId?: number
  ) {
  }
}
