import LogProviderInterface from "../../Application/Logger/LogProviderInterface";
import {injectable} from "inversify";

@injectable()
export default class ConsoleLogProvider implements LogProviderInterface {
    debug(message: string, context?: { [key: string]: any }): void {
        console.debug(message, context);
    }

    error(message: string, context?: { [key: string]: any }): void {
        console.error(message, context);
    }

    info(message: string, context?: { [key: string]: any }): void {
        console.info(message, context);
    }

    log(message: string, context?: { [key: string]: any }): void {
        console.log(message, context);
    }

    warn(message: string, context?: { [key: string]: any }): void {
        console.warn(message, context);
    }
}
