import type Command from '../../../../Domain/Command/Command'

export default class DeleteServiceCommand implements Command {
  constructor (
    public readonly id: number
  ) {}
}
