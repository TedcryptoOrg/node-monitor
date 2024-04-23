import { type RequestHandler, type Request, type Response } from 'express'
import { myContainer } from '../../../Infrastructure/DependencyInjection/inversify.config'
import CommandHandlerManager from '../../../Infrastructure/CommandHandler/CommandHandlerManager'
import RefreshTokenCommand from '../../../Application/Query/RefreshToken/RefreshTokenCommand'

export const refresh: RequestHandler = async (req: Request, resp: Response) => {
  const commandHandler = myContainer.get(CommandHandlerManager)

  try {
    const result = await commandHandler.handle(new RefreshTokenCommand(req.body.refreshToken))

    resp.status(200).send({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken
    })
  } catch (error) {
    resp.status(401).send({ message: 'Unauthorized' })
  }
}
