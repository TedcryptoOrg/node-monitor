import type Command from '../../../../Domain/Command/Command'

export default class GetUserCommand implements Command {
  constructor (public id: number) {}
}
