import type Command from '../../../../Domain/Command/Command'

export default class FindAllServerCommand implements Command {
  constructor (
    public readonly configurationId?: number
  ) {
  }
}
