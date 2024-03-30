import {WebSocketServer as WsServer} from "ws";
import {WebSocketServer} from "../../Domain/Server/WebSocketServer";

export default class WsWebSocketServer implements WebSocketServer{
    server: WsServer|undefined

    constructor (private readonly port: number) {}

    start(): void {
        this.server = new WsServer({ port: this.port });

        console.log(`WebSocket server started on port ${this.port}`);
    }

    on(event: string, listener: (...args: any[]) => void): void {
        if (!this.server) {
            this.start();
        }

        this.server?.on(event, listener);
    }
}