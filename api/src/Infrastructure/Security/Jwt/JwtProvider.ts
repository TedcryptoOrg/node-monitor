import SecurityProvider from '../../../Domain/Security/SecurityProvider'
import User from '../../../Domain/User/User'
import Token from '../../../Domain/Security/Token'
import jwt from 'jsonwebtoken'
import { inject, injectable } from 'inversify'
import { AuthenticatePayload } from '../../../Domain/Security/AuthenticatePayload'
import VerificationFailed from '../../../Domain/Security/VerificationFailed'
import UserRepository from '../../../Domain/User/UserRepository'
import { TYPES } from '../../../Domain/DependencyInjection/types'

@injectable()
export default class JwtProvider implements SecurityProvider {
  constructor (
    @inject(TYPES.UserRepository) private readonly userRepository: UserRepository
  ) {}

  generateTokens (user: User): { accessToken: Token, refreshToken: Token } {
    const token = jwt.sign(
      { id: user.id } as AuthenticatePayload,
      process.env.SECRET_TOKEN ?? 'secret',
      { expiresIn: '15m' }
    )
    const refreshToken = jwt.sign(
      { id: user.id } as AuthenticatePayload,
      process.env.REFRESH_TOKEN_SECRET ?? 'refresh-secret'
    )

    return {
      accessToken: new Token(token),
      refreshToken: new Token(refreshToken)
    }
  }

  async verifyToken (token: Token): Promise<User> {
    try {
      const payload = await jwt.verify(
        token.value,
        process.env.SECRET_TOKEN ?? 'secret'
      ) as AuthenticatePayload

      return await this.userRepository.get(payload.id)
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw VerificationFailed.tokenExpired()
      }

      throw VerificationFailed.failedToAuthenticate()
    }
  }
}
