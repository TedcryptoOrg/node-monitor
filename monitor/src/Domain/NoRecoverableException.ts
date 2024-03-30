export class NoRecoverableException extends Error {
  constructor (message: string|undefined) {
    super(message)
    this.name = 'NoRecoverableException'
  }
}
