import { type MonitorCheck } from './monitorCheck'
import { Alerter } from '../../Alerter/alerter'
import {PrometheusConfiguration} from "../../type/prometheusConfiguration";

/**
 * Checks that Prometheus is alive and well
 */
export class PrometheusCheck implements MonitorCheck {
  private readonly alerter: Alerter

  constructor (
    private readonly name: string,
    private readonly configuration: PrometheusConfiguration,
    private readonly alertChannels: any
  ) {
    this.alerter = new Alerter(
      this.name,
      'PrometheusCheck',
      this.alertChannels,
      5
    )
  }

  async check (): Promise<void> {
    const checkMin = 1
    const prometheusUrl = this.configuration.address
    const minutesSinceDown = 0

    while (true) {
      console.log(`[${this.name}] Running PROMETHEUS check...`)
      const isPrometheusAccessible = await this.isUrlAccessible(prometheusUrl)
      if (!isPrometheusAccessible) {
        console.log(`[${this.name}][PROMETHEUS] PROMETHEUS is not accessible. Sending alerts...`)
        await this.alerter.alert(`🚨 ${this.name} PROMETHEUS is not accessible. Minutes since down: ${minutesSinceDown}`)
      } else {
        console.log(`[${this.name}][PROMETHEUS] PROMETHEUS is accessible.`)
      }
      console.log(`[${this.name}][PROMETHEUS] Waiting ${checkMin} minutes before checking again...`)
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
