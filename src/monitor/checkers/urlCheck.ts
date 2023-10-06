import { type MonitorCheck } from './monitorCheck'
import { Alerter } from '../../Alerter/alerter'
import {UrlCheckConfiguration} from "../../type/config/urlCheckConfiguration";

/**
 * Checks that port is alive and well
 */
export class UrlCheck implements MonitorCheck {
  private readonly alerter: Alerter

  constructor (
    private readonly name: string,
    private readonly configuration: UrlCheckConfiguration,
    private readonly alertChannels: any
  ) {
    this.alerter = new Alerter(
      this.name,
      'UrlCheck',
      this.alertChannels,
      5
    )
  }

  async check (): Promise<void> {
    const checkMin = 1
    const minutesSinceDown = 0

    while (true) {
      console.log(`[${this.name}][${this.configuration.name}] Running url check...`)
      const isAccessible = await this.isUrlAccessible(this.configuration.address)
      if (!isAccessible) {
        console.log(`[${this.name}][${this.configuration.name}] Is not accessible. Sending alerts...`)
        await this.alerter.alert(`🚨 [${this.name}][${this.configuration.name}] Is not accessible. Minutes since down: ${minutesSinceDown}`)
      } else {
        console.log(`[${this.name}][${this.configuration.name}] Is accessible.`)
      }
      console.log(`[${this.name}][${this.configuration.name}] Waiting ${checkMin} minutes before checking again...`)
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
