import { type ServiceType } from './ServiceType'

export default class Service {
  constructor (
    public readonly id: number,
    public readonly type: ServiceType,
    public readonly name: string,
    public readonly isEnabled: boolean,
    public readonly address: string
  ) {
  }
}
