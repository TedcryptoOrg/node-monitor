import CommandHandler from '../../../Domain/Command/CommandHandler'
import RefreshTokenCommand from './RefreshTokenCommand'
import { inject, injectable } from 'inversify'
import User from '../../../Domain/User/User'
import SecurityProvider from '../../../Domain/Security/SecurityProvider'
import Token from '../../../Domain/Security/Token'
import { TYPES } from '../../../Domain/DependencyInjection/types'

@injectable()
export default class RefreshTokenCommandHandler implements CommandHandler<RefreshTokenCommand> {
  constructor (
    @inject(TYPES.SecurityProvider) private readonly securityProvider: SecurityProvider
  ) {
  }

  public async handle (command: RefreshTokenCommand): Promise<{ user: User, accessToken: Token, refreshToken: Token }> {
    const user = await this.securityProvider.verifyToken(new Token(command.token))

    return {
      user,
      ...this.securityProvider.generateTokens(user)
    }
  }
}
