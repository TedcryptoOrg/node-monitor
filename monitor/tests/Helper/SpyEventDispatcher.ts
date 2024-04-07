import Event from "../../src/Domain/Event/Event";
import {EventDispatcher as EventDispatcherInterface} from "../../src/Domain/Event/EventDispatcher";
import EventDispatcher from "../../src/Application/Event/EventDispatcher";

export default class SpyEventDispatcher implements EventDispatcherInterface {
    public events: Event[] = [];

    constructor(
        private eventDispatcher: EventDispatcher
    ) {}

    async dispatch(event: Event): Promise<void> {
        this.events.push(event);

        return this.eventDispatcher.dispatch(event);
    }

    wasEventDispatched(event: string): boolean {
        return this.events.some(e => e.constructor.name === event);
    }

    clear(): void {
        this.events = [];
    }
}
