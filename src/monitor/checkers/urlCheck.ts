import { type MonitorCheck } from './monitorCheck'
import { Alerter } from '../../Alerter/alerter'

/**
 * Checks that port is alive and well
 */
export class UrlCheck implements MonitorCheck {
  private readonly alerter: Alerter

  constructor (
    private readonly name: string,
    private readonly serviceName: string,
    private readonly address: string,
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
      console.log(`[${this.name}][${this.serviceName}] Running url check...`)
      const isAccessible = await this.isUrlAccessible(this.address)
      if (!isAccessible) {
        console.log(`[${this.name}][${this.serviceName}] Is not accessible. Sending alerts...`)
        await this.alerter.alert(`🚨 [${this.name}][${this.serviceName}] Is not accessible. Minutes since down: ${minutesSinceDown}`)
      } else {
        console.log(`[${this.name}][${this.serviceName}] Is accessible.`)
      }
      console.log(`[${this.name}][${this.serviceName}] Waiting ${checkMin} minutes before checking again...`)
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
