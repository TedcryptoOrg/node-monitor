import type Command from '../../../../Domain/Command/Command'

export default class GetMetricsCommand implements Command {
  constructor (
    public readonly serverId: number
  ) {}
}
