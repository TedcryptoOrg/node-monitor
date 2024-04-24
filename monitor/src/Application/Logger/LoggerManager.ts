import LogProviderInterface from "./LogProviderInterface";
import {injectable} from "inversify";
import Logger from "./Logger";

@injectable()
export default class LoggerManager implements Logger {
    private providers: LogProviderInterface[] = [];

    addProvider(provider: LogProviderInterface): void {
        this.providers.push(provider);
    }

    info(message: string, context?: { [key: string]: any }): void {
        this.providers.forEach(provider => provider.info(message, context));
    }

    error(message: string, context?: { [key: string]: any }): void {
        this.providers.forEach(provider => provider.error(message, context));
    }

    debug(message: string, context?: { [key: string]: any }): void {
        this.providers.forEach(provider => provider.debug(message, context));
    }

    log(message: string, context?: { [key: string]: any }): void {
        this.providers.forEach(provider => provider.log(message, context));
    }

    warn(message: string, context?: { [key: string]: any }): void {
        this.providers.forEach(provider => provider.warn(message, context));
    }
}
