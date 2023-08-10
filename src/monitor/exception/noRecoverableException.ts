export class NoRecoverableException extends Error {
  constructor (message: any) {
    super(message)
    this.name = 'NoRecoverableException'
  }
}
