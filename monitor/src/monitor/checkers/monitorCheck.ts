import {CheckStatus} from "../../Domain/Checker/CheckStatusEnum";
import {pingMonitor} from "../../services/monitorsManager";
import {
  ApiMonitor,
  BlockAlertConfiguration,
  NodeExporterDiskSpaceUsageConfiguration,
  UrlCheckConfiguration
} from "../../Infrastructure/Api/Tedcrypto/Types/ApiMonitor";
import {Alerter} from "../../Alerter/alerter";
import {AlertChannel} from "../../AlertChannel/alertChannel";

export abstract class MonitorCheck {
  protected readonly configuration: BlockAlertConfiguration|NodeExporterDiskSpaceUsageConfiguration|UrlCheckConfiguration
  protected readonly alerter: Alerter
  protected status: CheckStatus = CheckStatus.UNKNOWN
  private lastTimePing: number = 0
  private pingInterval: number = 60

  constructor(
      protected readonly monitor: ApiMonitor,
      private readonly alertChannels: AlertChannel[]
  ) {
    this.configuration = JSON.parse(this.monitor.configuration_object) as BlockAlertConfiguration|NodeExporterDiskSpaceUsageConfiguration|UrlCheckConfiguration

    this.alerter = new Alerter(
        this.monitor.configuration.name,
        'BlockCheck',
        this.alertChannels,
        this.configuration.alert_sleep_duration_minutes ?? 5
    )
  }

  /**
   * @throws NoRecoverableException|RecoverableException
   */
  abstract check(): Promise<void>;

  async fail(message: string): Promise<void>
  {
    console.log(`🔴️${this.getMessagePrefix()} ${message}`)
    await pingMonitor(this.monitor.id as number, {status: false, last_error: message})
    await this.alerter.alert(`🚨${this.getMessagePrefix()} ${message}`)

    this.status = CheckStatus.ERROR
  }

  async warning(message: string): Promise<void>
  {
    console.debug(`🟡️${this.getMessagePrefix()} ${message}`)
    if (this.isPingTime()) {
      await pingMonitor(this.monitor.id as number, {status: true, last_error: message})
    }

    if (this.status !== CheckStatus.ERROR) {
      this.status = CheckStatus.WARNING
    }
  }

  async success(message: string): Promise<void>
  {
    console.log(`🟢️${this.getMessagePrefix()} ${message}`)

    if (this.isPingTime() || this.status.toString() !== CheckStatus.OK.toString()) {
      await pingMonitor(this.monitor.id as number, {status: true, last_error: null})
    }

    if (this.status === CheckStatus.ERROR) {
      await this.alerter.resolve(`🟢️${this.getMessagePrefix()} ${message}!`);
    }

    this.status = CheckStatus.OK
  }

  private isPingTime(): boolean
  {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastTimePing >= this.pingInterval * 1000) {
      this.lastTimePing = currentTime;
      return true;
    }

    return false;
  }

  protected getMessagePrefix(): string
  {
    return `[${this.monitor.configuration.name}][${this.monitor.type}]`;
  }
}
