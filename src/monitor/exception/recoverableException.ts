export class RecoverableException extends Error {
  constructor (message: any) {
    super(message)
    this.name = 'recoverableException'
  }
}
