import { type MonitorCheck } from './monitorCheck'
import { Alerter } from '../../Alerter/alerter'
import {RestConfiguration} from "../../type/restConfiguration";

/**
 * Checks that REST is alive and well
 */
export class RestCheck implements MonitorCheck {
  private readonly alerter: Alerter

  constructor (
    private readonly name: string,
    private readonly configuration: RestConfiguration,
    private readonly alertChannels: any
  ) {
    this.alerter = new Alerter(
      this.name,
      'RestCheck',
      this.alertChannels,
      5
    )
  }

  async check (): Promise<void> {
    const checkMin = 1
    const RESTUrl = this.configuration.address
    const minutesSinceDown = 0

    while (true) {
      console.log(`[${this.name}] Running REST check...`)
      const isRESTAccessible = await this.isUrlAccessible(RESTUrl)
      if (!isRESTAccessible) {
        console.log(`[${this.name}][REST] REST is not accessible. Sending alerts...`)
        await this.alerter.alert(`🚨 ${this.name} REST is not accessible. Minutes since down: ${minutesSinceDown}`)
      } else {
        console.log(`[${this.name}][REST] REST is accessible.`)
      }
      console.log(`[${this.name}][REST] Waiting ${checkMin} minutes before checking again...`)
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
