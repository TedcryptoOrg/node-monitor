import Command from '../../Domain/Command/Command'
import CommandHandler from '../../Domain/Command/CommandHandler'
import { inject, injectable, multiInject } from 'inversify'
import 'reflect-metadata'
import { TYPES } from '../../Domain/DependencyInjection/types'
import { Logger } from 'winston'

@injectable()
export default class CommandHandlerManager {
  private readonly handlersMap: Map<string, CommandHandler<Command>>

  public constructor (
    @multiInject(TYPES.CommandHandler) handlers: Array<CommandHandler<Command>> = new Array<CommandHandler<Command>>(),
    @inject(TYPES.Logger) private readonly logger: Logger
  ) {
    this.handlersMap = new Map()
    handlers.forEach(handler => {
      const handlerName = handler.constructor.name.replace('Handler', '')
      this.handlersMap.set(handlerName, handler)
    })
  }

  public async handle (command: Command): Promise<any> {
    const handler = this.handlersMap.get(command.constructor.name)
    if (handler === undefined) {
      this.logger.error(`No handler registered for command ${command.constructor.name}. Did you forget to register it?`)
      throw new Error(`No handler registered for command ${command.constructor.name}. Did you forget to register it?`)
    }

    this.logger.info(`Handling command ${command.constructor.name}`)
    return await handler.handle(command)
  }
}
