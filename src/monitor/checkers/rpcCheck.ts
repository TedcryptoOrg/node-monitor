import { type MonitorCheck } from './monitorCheck'
import { type RpcConfiguration } from '../../type/rpcConfiguration'
import { Alerter } from '../../Alerter/alerter'

/**
 * Checks that RPC is alive and well
 */
export class RpcCheck implements MonitorCheck {
  private readonly alerter: Alerter

  constructor (
    private readonly name: string,
    private readonly configuration: RpcConfiguration,
    private readonly alertChannels: any
  ) {
    this.alerter = new Alerter(
      this.name,
      'RpcCheck',
      this.alertChannels,
      5
    )
  }

  async check (): Promise<void> {
    const checkMin = 1
    const rpcUrl = this.configuration.address
    const minutesSinceDown = 0

    while (true) {
      console.log(`[${this.name}] Running RPC check...`)
      const isRpcAccessible = await this.isUrlAccessible(rpcUrl)
      if (!isRpcAccessible) {
        console.log(`[${this.name}][RPC] RPC is not accessible. Sending alerts...`)
        await this.alerter.alert(`🚨 ${this.name} RPC is not accessible. Minutes since down: ${minutesSinceDown}`)
      } else {
        console.log(`[${this.name}][RPC] RPC is accessible.`)
      }
      console.log(`[${this.name}][RPC] Waiting ${checkMin} minutes before checking again...`)
      await new Promise((resolve) => setTimeout(resolve, 60000 * checkMin))
    }
  }

  async isUrlAccessible (url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      return response.ok
    } catch (error) {
      return false
    }
  }
}
