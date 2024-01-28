export default class EventEmitter {
    private static instance: EventEmitter;
    private events: any;

    private constructor() {
        this.events = {};
    }

    public static getInstance(): EventEmitter {
        if (!EventEmitter.instance) {
            EventEmitter.instance = new EventEmitter();
        }

        return EventEmitter.instance;
    }

    public on(event: string, listener: any): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(listener);
    }

    public emit(event: string, ...args: any[]): void {
        const listeners = this.events[event];

        if (listeners) {
            listeners.forEach((listener: any) => {
                listener(...args);
            });
        }
    }

    public removeListener(event: string, listenerToRemove: any): void {
        const listeners = this.events[event];

        if (listeners) {
            this.events[event] = listeners.filter((listener: any) => listener !== listenerToRemove);
        }
    }
}

export const eventEmitter = EventEmitter.getInstance();
