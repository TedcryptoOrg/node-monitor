export interface WebSocketServer {
    on(event: string, listener: (...args: any[]) => void): void;
}