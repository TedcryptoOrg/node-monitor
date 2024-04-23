import type Command from '../../../../Domain/Command/Command'

export default class PingMonitorCommand implements Command {
  constructor (
    public readonly id: number,
    public readonly status: boolean,
    public readonly lastError: string | null
  ) {}
}
