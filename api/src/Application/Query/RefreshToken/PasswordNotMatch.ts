export default class PasswordNotMatch extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'PasswordNotMatch'
  }
}
