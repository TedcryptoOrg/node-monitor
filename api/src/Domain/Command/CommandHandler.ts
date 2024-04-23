export default interface CommandHandler<TCommand> {
  handle: (command: TCommand) => Promise<any>
}
