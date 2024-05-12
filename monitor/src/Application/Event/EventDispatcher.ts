import EventHandler from '../../Domain/Event/EventHandler'
import { inject, injectable, multiInject } from 'inversify'
import Event from '../../Domain/Event/Event'
import { TYPES } from '../../Domain/DependencyInjection/types'
import { EventDispatcher as EventDispatcherInterface } from '../../Domain/Event/EventDispatcher'
import Logger from '../Logger/Logger'

@injectable()
export default class EventDispatcher implements EventDispatcherInterface {
  constructor (
    @multiInject(TYPES.EventHandler) private readonly handlers: EventHandler[] = new Array<EventHandler>(),
    @inject(TYPES.Logger) private readonly logger: Logger
  ) {
  }

  public async dispatch (event: Event): Promise<void> {
    for (const handler of this.handlers) {
      if (handler.supports(event)) {
        try {
          await handler.handle(event)
        } catch (error: any) {
          this.logger.error(`Error occurred while handling event ${event.constructor.name} with handler ${handler.constructor.name}`, { error })
        }
      }
    }
  }
}
