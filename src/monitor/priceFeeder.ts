import { type MonitorCheck } from './checkers/monitorCheck'
import { MissCounter } from './checkers/missCounter'
import { type Monitor } from './monitor'
import { type AlertChannel } from '../AlertChannel/alertChannel'
import { type Configuration } from '../type/configuration'

export class PriceFeeder implements Monitor {
  private readonly monitor_params: MonitorCheck[] = []

  constructor (
    private readonly name: string,
    private readonly configuration: Configuration,
    private readonly alertChannels: AlertChannel[]
  ) {
    this.monitor_params.push(
      new MissCounter(this.name, this.configuration, this.alertChannels)
    )
  }

  async start (): Promise<void> {
    for (const param of this.monitor_params) {
      try {
        await param.check()
      } catch (error) {
        const message = `🚨 ${this.name} Price feeder error: \n${error}`
        for (const alerter of this.alertChannels) {
          try {
            await alerter.alert(message)
          } catch (error) {
            console.log(`Error sending alert: ${error} to ${alerter.constructor.name}`)
          }
        }

        console.log(message)
      }
    }
  }
}
