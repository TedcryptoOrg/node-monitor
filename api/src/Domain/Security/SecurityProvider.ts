import type User from '../User/User'
import type Token from './Token'

export default interface SecurityProvider {
  generateTokens: (user: User) => { accessToken: Token, refreshToken: Token }

  /**
     * @throws VerificationFailed
     */
  verifyToken: (token: Token) => Promise<User>
}
