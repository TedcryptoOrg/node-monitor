import { type MonitorCheck } from './checkers/monitorCheck'
import { type Monitor } from './monitor'
import { type AlertChannel } from '../AlertChannel/alertChannel'
import { type Configuration } from '../type/configuration'
import { RecoverableException } from './exception/recoverableException'
import { RpcCheck } from './checkers/rpcCheck'

export class NodeMonitor implements Monitor {
  private readonly monitor_params: MonitorCheck[] = []

  constructor (
    private readonly name: string,
    private readonly configuration: Configuration,
    private readonly alertChannels: AlertChannel[]
  ) {
    console.debug(this.configuration)

    if (this.configuration.rpc !== undefined) {
      this.monitor_params.push(new RpcCheck(this.name, this.configuration, this.alertChannels))
    }
  }

  async start (): Promise<void> {
    for (const param of this.monitor_params) {
      try {
        await param.check()
      } catch (error) {
        const message = `🚨 ${this.name} Node checker ${param.constructor.name} failed to start. Error: \n${error}`
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
