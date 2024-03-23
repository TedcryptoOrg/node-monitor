import EventHandler from "./EventHandler";
import {injectable, multiInject} from "inversify";
import Event from "./Event";
import {TYPES} from "../../../Domain/DependencyInjection/types";

@injectable()
export default class EventDispatcher {
    constructor(
        @multiInject(TYPES.EventHandler) private handlers: EventHandler[] = new Array<EventHandler>()
    ) {
    }

    public async dispatch(event: Event): Promise<void> {
        for (const handler of this.handlers) {
            if (handler.supports(event)) {
                try {
                    await handler.handle(event);
                } catch (error: any) {
                    console.error(`Error occurred while handling event ${event.constructor.name} with handler ${handler.constructor.name}`);
                    console.error(error);
                }
            }
        }
    }
}
