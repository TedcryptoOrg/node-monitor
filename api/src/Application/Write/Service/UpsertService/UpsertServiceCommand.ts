import type Command from '../../../../Domain/Command/Command'
import { type ServiceType } from '../../../../Domain/Service/ServiceType'

export default class UpsertServiceCommand implements Command {
  constructor (
    public readonly serverId: number,
    public readonly name: string,
    public readonly address: string,
    public readonly isEnabled: boolean,
    public readonly type: ServiceType,
    public readonly id?: number
  ) {}
}
