import type Command from '../../../../Domain/Command/Command'

export default class UpsertServerCommand implements Command {
  constructor (
    public readonly name: string,
    public readonly address: string,
    public readonly isEnabled: boolean,
    public readonly configurationId: number,
    public readonly id?: number
  ) {}
}
