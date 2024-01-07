import { type MonitorCheck } from './monitorCheck'
import { Alerter } from '../../Alerter/alerter'
import {ApiMonitor, UrlCheckConfiguration} from "../../type/api/ApiMonitor";
import axios from "axios";
import {pingMonitor} from "../../services/monitorsManager";

/**
 * Checks that port is alive and well
 */
export class UrlCheck implements MonitorCheck {
  private readonly alerter: Alerter
  private readonly configuration: UrlCheckConfiguration

  constructor (
    private readonly name: string,
    private readonly monitor: ApiMonitor,
    private readonly alertChannels: any
  ) {
    this.configuration = JSON.parse(this.monitor.configuration_object) as UrlCheckConfiguration
    console.debug(`🔨️[${this.name}][${this.configuration.name}] Creating url check...`, this.configuration);

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
      console.log(`🏃️[${this.name}][${this.configuration.name}] Running url check...`)
      const isAccessible = axios.get(this.configuration.address).then(() => true).catch(() => false);
      if (!isAccessible) {
        const message = `Is not accessible. Minutes since down: ${minutesSinceDown}`
        console.log(`🔴️[${this.name}][${this.configuration.name}] ${message}`)
        await pingMonitor(this.monitor.id as number, {status: false, last_error: message})
        await this.alerter.alert(`🚨 [${this.name}][${this.configuration.name}] ${message}`)
      } else {
        await pingMonitor(this.monitor.id as number, {status: true, last_error: null})
        console.log(`🟢️[${this.name}][${this.configuration.name}] Is accessible.`)
      }

      console.log(`🕗️[${this.name}][${this.configuration.name}] Waiting ${checkMin} minutes before checking again...`)
      await new Promise((resolve) => setTimeout(resolve, 60000 * checkMin))
    }
  }
}
