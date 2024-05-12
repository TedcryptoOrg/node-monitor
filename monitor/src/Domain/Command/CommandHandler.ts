export default interface CommandHandler<C> {
  handle: (command: C) => Promise<any>
}
