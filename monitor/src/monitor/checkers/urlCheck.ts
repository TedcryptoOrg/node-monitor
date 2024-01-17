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
  private isOkay: boolean = false
  private isFirstRun: boolean = true

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
      console.log(`🏃️[${this.name}][Url Check] Running check ${this.monitor.name} url...`)
      const isAccessible = axios.get(this.configuration.address).then(() => true).catch(() => false);
      if (!isAccessible) {
        await this.fail(`${this.monitor.name} is not accessible. Minutes since down: ${minutesSinceDown}`);
      } else {
        await this.success(`${this.monitor.name} is accessible`);
      }

      this.isFirstRun = false

      console.log(`🕗️[${this.name}][${this.monitor.name}] Waiting ${checkMin} minutes before checking again...`)
      await new Promise((resolve) => setTimeout(resolve, 60000 * checkMin))
    }
  }

  private async fail(message: string): Promise<void>
  {
    console.log(`🔴️[${this.name}][Url Check] ${message}`)
    await pingMonitor(this.monitor.id as number, {status: false, last_error: message})

    await this.alerter.alert(`🚨 [${this.name}][Url Check] ${message}`)

    this.isOkay = false;
  }

  private async success(message: string): Promise<void>
  {
    console.log(`🟢️[${this.name}][Url Check] ${message}`)

    if (!this.isOkay) {
      await pingMonitor(this.monitor.id as number, {status: true, last_error: null})
      if (!this.isFirstRun) {
        await this.alerter.resolve(`🟢️[${this.name}][Url Check] ${message}`)
      }
    }

    this.isOkay = true
  }
}
