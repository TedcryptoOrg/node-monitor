import RefreshTokenCommand from './RefreshTokenCommand'
import { inject, injectable } from 'inversify'
import User from '../../../Domain/User/User'
import { PasswordEncoder } from '../../../Domain/Security/PasswordEncoder'
import SecurityProvider from '../../../Domain/Security/SecurityProvider'
import Token from '../../../Domain/Security/Token'
import { TYPES } from '../../../Domain/DependencyInjection/types'
import CommandHandler from '../../../Domain/Command/CommandHandler'

export interface RefreshTokenCommandHandlerResult {
  user: User
  accessToken: Token
  refreshToken: Token
}

@injectable()
export default class RefreshTokenCommandHandler implements CommandHandler<RefreshTokenCommand> {
  constructor (
    @inject(TYPES.SecurityProvider) private readonly securityProvider: SecurityProvider,
    @inject(TYPES.PasswordEncoder) private readonly passwordEncoder: PasswordEncoder
  ) {
  }

  public async handle (command: RefreshTokenCommand): Promise<RefreshTokenCommandHandlerResult> {
    const user = await this.securityProvider.verifyToken(new Token(command.token))

    return {
      user,
      ...this.securityProvider.generateTokens(user)
    }
  }
}
