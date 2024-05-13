import type Command from '../../../Domain/Command/Command'

export default class PingHealthcheckCommand implements Command {
  constructor (
    public readonly healthCheckUrl: string
  ) {
  }
}
