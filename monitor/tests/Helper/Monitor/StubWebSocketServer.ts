import {WebSocketServer} from '../../../src/Domain/Server/WebSocketServer';

export default class StubWebSocketServer implements WebSocketServer {
    private connected: boolean = false;
    private sentEvents: string[] = [];
    private listeners: Map<string, Function> = new Map<string, Function>();

    on(event: string, listener: (...args: any[]) => void): void {
        this.sentEvents.push(event);
        if (event === 'connection') {
            this.connected = true;
            listener(this);
            return
        }

        this.listeners.set(event, listener);
    }

    trigger(event: string, message: string): void {
        const invokable = this.listeners.get(event);
        invokable instanceof Function ? invokable(message) : undefined;
    }

    isConnected(): boolean {
        return this.connected;
    }

    wasEventSent(event: string): boolean {
        return this.sentEvents.includes(event);
    }

}