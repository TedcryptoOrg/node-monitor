import type { Response } from 'express'
import type Command from '../../Domain/Command/Command'
import { myContainer } from '../../Infrastructure/DependencyInjection/inversify.config'
import RecordNotFound from '../../Domain/RecordNotFound'
import CommandHandlerManager from '../../Infrastructure/CommandHandler/CommandHandlerManager'

export async function handleCommand (
  command: Command,
  resp: Response,
  next: (result: any) => any | undefined,
  errorHandler?: ((error: any, resp: Response) => Promise<boolean>)
): Promise<void> {
  const commandHandler = myContainer.get<CommandHandlerManager>(CommandHandlerManager)
  try {
    next(await commandHandler.handle(command))
  } catch (error: any) {
    console.log('Command handler error', error)
    if (errorHandler !== undefined) {
      if (await errorHandler(error, resp)) {
        return
      }
    }
    if (error instanceof RecordNotFound) {
      resp.status(404).send({ message: error.message })
      return
    }

    resp.status(500).send({ message: error.message })
  }
}
