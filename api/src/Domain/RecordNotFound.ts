export default class RecordNotFound extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'RecordNotFound'
  }
}
