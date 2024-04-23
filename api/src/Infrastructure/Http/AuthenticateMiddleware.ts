import { type Request, type Response } from 'express'
import { myContainer } from '../DependencyInjection/inversify.config'
import type SecurityProvider from '../../Domain/Security/SecurityProvider'
import Token from '../../Domain/Security/Token'
import VerificationFailed from '../../Domain/Security/VerificationFailed'
import type User from '../../Domain/User/User'
import { TYPES } from '../../Domain/DependencyInjection/types'

export const authenticateMiddleware = async (req: Request, res: Response): Promise<void> => {
  const securityProvider: SecurityProvider = myContainer.get(TYPES.SecurityProvider)
  const token = req.headers.authorization
  if (token === undefined) {
    res.status(401).json({ message: 'No token provided' })
    return
  }

  try {
    await securityProvider.verifyToken(new Token(token))
      .then((user: User) => {
        res.locals.user = user
      })
  } catch (error) {
    if (error instanceof VerificationFailed &&
            error.code === VerificationFailed.TOKEN_EXPIRED
    ) {
      res.status(401).json({ message: 'Token expired' })
      return
    }

    res.status(401).json({ message: 'Unauthorized' })
  }
}
