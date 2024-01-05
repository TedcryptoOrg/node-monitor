import { type MonitorCheck } from './monitorCheck'
import { Alerter } from '../../Alerter/alerter'
import {UrlCheckConfiguration} from "../../type/api/ApiMonitor";
import axios from "axios";

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
    console.debug(`🔨️[${this.name}][${this.configuration.name}] Creating url check...`, configuration);

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
        console.log(`🔴️[${this.name}][${this.configuration.name}] Is not accessible. Sending alerts...`)
        await this.alerter.alert(`🚨 [${this.name}][${this.configuration.name}] Is not accessible. Minutes since down: ${minutesSinceDown}`)
      } else {
        console.log(`🟢️[${this.name}][${this.configuration.name}] Is accessible.`)
      }
      console.log(`🕗️[${this.name}][${this.configuration.name}] Waiting ${checkMin} minutes before checking again...`)
      await new Promise((resolve) => setTimeout(resolve, 60000 * checkMin))
    }
  }
}
