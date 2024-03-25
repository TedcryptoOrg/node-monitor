import Command from "./Command";

export default interface CommandHandler {
    handle(command: Command): Promise<any>;
}