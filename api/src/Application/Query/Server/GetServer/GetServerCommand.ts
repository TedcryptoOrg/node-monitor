import type Command from '../../../../Domain/Command/Command'

export default class GetServerCommand implements Command {
  constructor (
    public readonly id: number
  ) {}
}
