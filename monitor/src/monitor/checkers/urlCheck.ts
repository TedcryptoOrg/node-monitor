import {ApiMonitor, UrlCheckConfiguration} from "../../Infrastructure/Api/Tedcrypto/Types/ApiMonitor";
import axios from "axios";
import {AlertChannel} from "../../AlertChannel/alertChannel";
import {MonitorCheck} from "./monitorCheck";

export class UrlCheck extends MonitorCheck {
  constructor (
    monitor: ApiMonitor,
    alertChannels: AlertChannel[]
  ) {
    super(monitor, alertChannels)
    console.debug(`🔨${this.getMessagePrefix()} Creating url check...`, this.configuration);
  }

  async check (): Promise<void> {
    const checkMin = 1
    const minutesSinceDown = 0
    const configuration = this.configuration as UrlCheckConfiguration;

    while (true) {
      console.log(`🏃️${this.getMessagePrefix()} Running check ${this.monitor.name} url...`)
      const isAccessible = axios.get(configuration.address).then(() => true).catch(() => false);
      if (!isAccessible) {
        await this.fail(`${this.monitor.name} is not accessible. Minutes since down: ${minutesSinceDown}`);
      } else {
        await this.success(`${this.monitor.name} is accessible`);
      }

      console.log(`🕗️${this.getMessagePrefix()} Waiting ${checkMin} minutes before checking again...`)
      await new Promise((resolve) => setTimeout(resolve, 60000 * checkMin))
    }
  }
}
