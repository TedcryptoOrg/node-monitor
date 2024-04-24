export default interface LogProviderInterface {
    info(message: string, context?: { [key: string]: any }): void;
    error(message: string, context?: { [key: string]: any }): void;
    log(message: string, context?: { [key: string]: any }): void;
    warn(message: string, context?: { [key: string]: any }): void;
    debug(message: string, context?: { [key: string]: any }): void;
}