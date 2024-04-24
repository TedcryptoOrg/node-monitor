import {inject, injectable} from "inversify";
import LogProviderInterface from "../../Application/Logger/LogProviderInterface";
import {TYPES} from "../../Domain/DependencyInjection/types";
import {WebSocketServer} from "../../Domain/Server/WebSocketServer";

@injectable()
export default class WebsocketLogProvider implements LogProviderInterface {
    constructor(
        @inject(TYPES.WebSocketServer) private readonly ws: WebSocketServer
    ) {
    }

    debug(message: string, context?: { [key: string]: any }): void {
        this.ws.send({
            level: "debug",
            message: message,
            timestamp: new Date().toISOString(),
            ...context
        });
    }

    error(message: string, context?: { [key: string]: any }): void {
        this.ws.send({
            level: "error",
            message: message,
            timestamp: new Date().toISOString(),
            ...context
        });
    }

    info(message: string, context?: { [key: string]: any }): void {
        this.ws.send({
            level: "info",
            message: message,
            timestamp: new Date().toISOString(),
            ...context
        });
    }

    log(message: string, context?: { [key: string]: any }): void {
        this.ws.send({
            level: "log",
            message: message,
            timestamp: new Date().toISOString(),
            ...context
        });
    }

    warn(message: string, context?: { [key: string]: any }): void {
        this.ws.send({
            level: "warn",
            message: message,
            timestamp: new Date().toISOString(),
            ...context
        });
    }
}