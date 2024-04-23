import Command from '../../Domain/Command/Command'
import CommandHandler from '../../Domain/Command/CommandHandler'
import { injectable, multiInject } from 'inversify'
import 'reflect-metadata'
import { TYPES } from '../../Domain/DependencyInjection/types'

@injectable()
export default class CommandHandlerManager {
  private readonly handlersMap: Map<string, CommandHandler<Command>>

  public constructor (
    @multiInject(TYPES.CommandHandler) handlers: Array<CommandHandler<Command>> = new Array<CommandHandler<Command>>()
  ) {
    this.handlersMap = new Map()
    handlers.forEach(handler => {
      const handlerName = handler.constructor.name.replace('Handler', '')
      this.handlersMap.set(handlerName, handler)
    })
  }

  public async handle (command: Command): Promise<any> {
    const handler = this.handlersMap.get(command.constructor.name)
    if (handler !== undefined) {
      return await handler.handle(command)
    }

    throw new Error(
            `No handler registered for command ${command.constructor.name}. Did you forget to register it?`
    )
  }
}
