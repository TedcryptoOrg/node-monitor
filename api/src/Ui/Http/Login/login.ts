import { type Request, type Response } from 'express'
import { myContainer } from '../../../Infrastructure/DependencyInjection/inversify.config'
import CommandHandlerManager from '../../../Infrastructure/CommandHandler/CommandHandlerManager'
import LoginCommand from '../../../Application/Query/Login/LoginCommand'
import RecordNotFound from '../../../Domain/RecordNotFound'
import PasswordNotMatch from '../../../Application/Query/Login/PasswordNotMatch'
import { castToString } from '../HttpUtil'

export const login = async (req: Request, resp: Response): Promise<void> => {
  const commandHandler = myContainer.get(CommandHandlerManager)

  try {
    const commandResult = await commandHandler.handle(new LoginCommand(
      castToString(req.body.username),
      castToString(req.body.password)
    ))

    resp.status(200).send({
      accessToken: commandResult.accessToken.toArray(),
      refreshToken: commandResult.refreshToken.toArray()
    })
  } catch (error) {
    if (error instanceof RecordNotFound || error instanceof PasswordNotMatch) {
      resp.status(401).send({ message: 'Username or password is incorrect' })
      return
    }

    throw error
  }
}
