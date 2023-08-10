import { type MonitorCheck } from './checkers/monitorCheck'
import { MissCounter } from './checkers/missCounter'
import { type Monitor } from './monitor'
import { type AlertChannel } from '../AlertChannel/alertChannel'
import { type Configuration } from '../type/configuration'
import { RecoverableException } from './exception/recoverableException'

export class PriceFeeder implements Monitor {
  private readonly monitor_params: MonitorCheck[] = []

  constructor (
    private readonly name: string,
    private readonly configuration: Configuration,
    private readonly alertChannels: AlertChannel[]
  ) {
    console.debug(this.configuration)
    this.monitor_params.push(
      new MissCounter(this.name, this.configuration, this.alertChannels)
    )
  }

  async start (): Promise<void> {
    for (const param of this.monitor_params) {
      try {
        await param.check()
      } catch (error) {
        const message = `🚨 ${this.name} Price feeder checker ${param.constructor.name} failed to start. Error: \n${error}`
        console.log(message)

        if (error instanceof RecoverableException) {
          console.log('Waiting 5 seconds before retrying...')
          await new Promise((resolve) => setTimeout(resolve, 5 * 1000))
          this.start()
        }
      }
    }
  }
}
