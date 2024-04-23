import type Command from '../../../Domain/Command/Command'

export default class RefreshTokenCommand implements Command {
  constructor (
    public token: string
  ) {
  }
}
