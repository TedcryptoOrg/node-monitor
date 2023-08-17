import { MissCounter } from './checkers/missCounter'
import { type AlertChannel } from '../AlertChannel/alertChannel'
import { type Configuration } from '../type/configuration'
import { AbstractMonitor } from './abstractMonitor'

export class PriceFeeder extends AbstractMonitor {
  constructor (
    protected readonly name: string,
    private readonly configuration: Configuration,
    private readonly alertChannels: AlertChannel[]
  ) {
    super()
    this.monitor_params.push(
      new MissCounter(this.name, this.configuration, this.alertChannels)
    )
  }
}
