import type Command from '../../../../Domain/Command/Command'

export default class FindAllMonitorsCommand implements Command {
  constructor (
    public readonly configurationId?: number,
    public readonly serverId?: number
  ) {
  }
}
