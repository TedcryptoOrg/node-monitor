import axios from 'axios'
import {CryptoTools} from '../../../crypto/crypto_tools'
import {type MonitorCheck} from '../monitorCheck'
import {type AlertChannel} from '../../../AlertChannel/alertChannel'
import {NoRecoverableException} from '../../exception/noRecoverableException'
import {RecoverableException} from '../../exception/recoverableException'
import {Alerter} from '../../../Alerter/alerter'
import {ApiMonitor, PriceFeederMissCountConfiguration} from "../../../type/api/ApiMonitor";
import {pingMonitor} from "../../../services/monitorsManager";
import {ApiService} from "../../../type/api/ApiService";
import {ServiceTypeEnum} from "../../../type/api/ServiceTypeEnum";

export class MissCounter implements MonitorCheck {
  private readonly staticEndpoints: { kujira: string, ojo: string } = {
    kujira: '/oracle/validators/%valoper%/miss',
    ojo: '/ojo/oracle/v1/validators/%valoper%/miss'
  }

  private readonly cryptoTools: CryptoTools
  private readonly endpoint: string
  private readonly alerter: Alerter
  private readonly configuration: PriceFeederMissCountConfiguration
  private isOkay: boolean = false
  private isFirstRun: boolean = false
  private lastTimePing: number = 0;
  private readonly pingInterval: number = 60;
  private restAddress: string|undefined = undefined;

  constructor (
    private readonly name: string,
    private readonly monitor: ApiMonitor,
    private readonly alertChannels: AlertChannel[],
    private readonly services: ApiService[]
  ) {
    this.configuration = JSON.parse(this.monitor.configuration_object) as PriceFeederMissCountConfiguration
    console.debug(`🔨️[${this.name}] Creating miss counter check...`, this.configuration)

    this.name = name
    this.cryptoTools = new CryptoTools()
    this.alertChannels = alertChannels

    this.endpoint = this.getEndpointUrl(this.configuration.valoper_address)
    this.alerter = new Alerter(
      this.name,
      'MissCounter',
      this.alertChannels,
      this.configuration.alert_sleep_duration_minutes
    )
  }

  async check (): Promise<void> {
    if (!Object.prototype.hasOwnProperty.call(this.staticEndpoints, this.monitor.configuration.chain)) {
      throw new NoRecoverableException(`Blockchain ${this.monitor.configuration.chain} not supported.`)
    }

    let previousMissCounter = await this.fetchMissCounter()
    let previousTimestamp = new Date().getTime()
    let lastMissCounter = previousMissCounter
    while (true) {
      console.log(`🏃️[${this.name}] Running miss counter check...`)
      const currentMissCounter = await this.fetchMissCounter()

      // Refresh the missing period if we are missing blocks within the period
      const missDifference = currentMissCounter - previousMissCounter
      if (currentMissCounter > lastMissCounter) {
        console.log(`🟡️[${this.name}][Price Feeder Miss] Miss has increased, current missed in this missing period: ${missDifference}. Refreshing previous incident timestamp.`)
        previousTimestamp = new Date().getTime()

        // Check if the miss counter exceeds the tolerance
        if (missDifference >= this.configuration.miss_tolerance) {
          await this.fail(missDifference);
        }
      } else if (missDifference > 0) {
        const currentTimestamp = new Date().getTime()

        const timeDifferentInSeconds = (currentTimestamp - previousTimestamp) / 1000
        const secondsLeftToReset = this.configuration.miss_tolerance_period_seconds - timeDifferentInSeconds
        if (secondsLeftToReset <= 0) {
          const message = `No more misses happened since last one. Last missed: ${missDifference}. Reset monitoring flags`
          await this.success(message)

          // Reset the miss counter if the tolerance period has passed
          previousMissCounter = currentMissCounter
          previousTimestamp = currentTimestamp
        } else {
          const message = `No more misses happened since last one. Last missed: ${missDifference}. Reset in ${secondsLeftToReset} seconds.`
          await this.warning(message)
        }
      } else {
        await this.success('No misses!');
      }

      lastMissCounter = currentMissCounter
      this.isFirstRun = false

      console.log(`🕗️[${this.name}][Price Feeder Miss] Waiting ${this.configuration.sleep_duration_seconds} seconds before checking again...`)
      await new Promise((resolve) => setTimeout(resolve, this.configuration.sleep_duration_seconds * 1000))
    }
  }

  async fail(missDifference: number): Promise<void> {
    const message = `Missing too many price updates. Miss counter exceeded: ${missDifference}`
    console.log(`🔴️[${this.name}] ${message}`)
    await pingMonitor(this.monitor.id as number, {status: false, last_error: message})
    await this.alerter.alert(`[${this.name}][Price Feeder Miss] 🚨 ${message}`)

    this.isOkay = false;
  }

  async warning(message: string): Promise<void> {
    console.debug(`🟡️[${this.name}][Price Feeder Miss] ${message}`)
    if (!this.isOkay && this.isPingTime()) {
      await pingMonitor(this.monitor.id as number, {status: true, last_error: message})
    }

    this.isOkay = true;
  }

  async success(message: string): Promise<void> {
    console.log(`🟢️[${this.name}][Price Feeder Miss] ${message}!`)

    if (!this.isOkay) {
      // If not okay then ping monitor saying all is fine now and alert TG
      await pingMonitor(this.monitor.id as number, {status: true, last_error: null})
      if (!this.isFirstRun) {
        await this.alerter.resolve(`🟢️[${this.name}][Price Feeder Miss] ${message}`);
      }
    }

    this.isOkay = true;
  }

  async fetchMissCounter (): Promise<number> {
    try {
      const response = await axios.get(this.getRestAddress() + this.endpoint)

      return Number(response.data.miss_counter)
    } catch (error: any) {
      console.error(error)
      throw new RecoverableException('Error fetching miss counter. Error: ' + error.message)
    }
  }

  isPingTime(): boolean
  {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastTimePing >= this.pingInterval * 1000) {
      this.lastTimePing = currentTime;
      return true;
    }

    return false;
  }

  getRestAddress(): string
  {
    if (!this.restAddress) {
      for (const service of this.services) {
        if (service.type === ServiceTypeEnum.REST) {
          console.log(`🔨️[${this.name}] Found REST service: ${service.address}`)
          this.restAddress = service.address;
          break;
        }
      }
    }
    if (this.restAddress === undefined) {
      throw new NoRecoverableException('No REST service found for this monitor');
    }

    return this.restAddress;
  }

  getEndpointUrl (valoperAddress: string): string {
    const chain = this.cryptoTools.getChainFromBech32Address(valoperAddress)

    for (const [key, value] of Object.entries(this.staticEndpoints)) {
      if (chain?.startsWith(key)) {
        return value.replace('%valoper%', valoperAddress)
      }
    }

    throw new NoRecoverableException('No endpoint found for chain: ' + (chain ?? 'unknown'))
  }
}
