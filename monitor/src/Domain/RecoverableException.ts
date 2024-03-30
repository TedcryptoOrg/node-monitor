export class RecoverableException extends Error {
  constructor (message: string|undefined) {
    super(message)
    this.name = 'recoverableException'
  }
}
