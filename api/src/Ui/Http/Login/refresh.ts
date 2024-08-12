import type { Request, Response } from 'express'
import RefreshTokenCommand from '../../../Application/Query/RefreshToken/RefreshTokenCommand'
import { handleCommand } from '../handleCommandUtil'
import type { RefreshTokenCommandHandlerResult } from '../../../Application/Query/RefreshToken/RefreshTokenCommandHandler'

export const refresh = async (req: Request, resp: Response): Promise<void> => {
  const authorization = req.headers.authorization
  if (authorization === undefined) {
    resp.status(401).json({ message: 'No token provided' })
    return
  }

  await handleCommand(
    new RefreshTokenCommand(authorization),
    resp,
    (result: RefreshTokenCommandHandlerResult) => {
      resp.status(200).send({
        accessToken: result.accessToken.toArray(),
        refreshToken: result.refreshToken.toArray()
      })
    }
  )
}
