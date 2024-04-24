import {WebSocketServer} from '../../../src/Domain/Server/WebSocketServer';

export default class StubWebSocketServer implements WebSocketServer {
    private connected: boolean = false;
    private sentEvents: string[] = [];
    private listeners: Map<string, Function> = new Map<string, Function>();
    private messages: string[] = [];

    on(event: string, listener: (...args: any[]) => void): void {
        this.sentEvents.push(event);
        if (event === 'connection') {
            this.connected = true;
            listener(this);
            return
        }

        this.listeners.set(event, listener);
    }

    send(message: string|object) {
        this.messages.push(typeof message === 'string' ? message : JSON.stringify(message));
    }

    getMessages(): string[] {
        return this.messages;
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