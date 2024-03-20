export interface ConsoleCommand {
    configureArgs(inputArgs: any): void
    
    run(inputArgs: any): Promise<Number>
}