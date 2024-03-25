import axios from 'axios'
import {CryptoTools} from '../../../Application/Shared/CryptoTools'
import {type AlertChannel} from '../../../AlertChannel/alertChannel'
import {NoRecoverableException} from '../../../Domain/NoRecoverableException'
import {RecoverableException} from '../../../Domain/RecoverableException'
import {ApiMonitor, PriceFeederMissCountConfiguration} from "../../../Infrastructure/Api/Tedcrypto/Types/ApiMonitor";
import {ApiService} from "../../../Infrastructure/Api/Tedcrypto/Types/ApiService";
import {ServiceTypeEnum} from "../../../Infrastructure/Api/Tedcrypto/Types/ServiceTypeEnum";
import {MonitorCheck} from "../monitorCheck";

export class MissCounter extends MonitorCheck {
  private readonly staticEndpoints: { kujira: string, ojo: string } = {
    kujira: '/oracle/validators/%valoper%/miss',
    ojo: '/ojo/oracle/v1/validators/%valoper%/miss'
  }

  private readonly cryptoTools: CryptoTools
  private readonly endpoint: string
  private restAddress: string|undefined = undefined;

  constructor (
    monitor: ApiMonitor,
    alertChannels: AlertChannel[],
    private readonly services: ApiService[]
  ) {
    super(monitor, alertChannels)

    const configuration = this.configuration as PriceFeederMissCountConfiguration

    this.cryptoTools = new CryptoTools()
    this.endpoint = this.getEndpointUrl(configuration.valoper_address)
  }

  async check (): Promise<void> {
    if (!Object.prototype.hasOwnProperty.call(this.staticEndpoints, this.monitor.configuration.chain)) {
      throw new NoRecoverableException(`Blockchain ${this.monitor.configuration.chain} not supported.`)
    }

    const configuration = this.configuration as PriceFeederMissCountConfiguration
    let previousMissCounter = await this.fetchMissCounter()
    let previousTimestamp = new Date().getTime()
    let lastMissCounter = previousMissCounter
    while (true) {
      console.log(`🏃️${this.getMessagePrefix()} Running miss counter check...`)
      const currentMissCounter = await this.fetchMissCounter()

      // Refresh the missing period if we are missing blocks within the period
      const missDifference = currentMissCounter - previousMissCounter
      if (currentMissCounter > lastMissCounter) {
        console.log(`🟡️${this.getMessagePrefix()} Miss has increased, current missed in this missing period: ${missDifference}. Refreshing previous incident timestamp.`)
        previousTimestamp = new Date().getTime()

        // Check if the miss counter exceeds the tolerance
        if (missDifference >= configuration.miss_tolerance) {
          const message = `Missing too many price updates. Miss counter exceeded: ${missDifference}`
          await this.fail(message);
        }
      } else if (missDifference > 0) {
        const currentTimestamp = new Date().getTime()

        const timeDifferentInSeconds = (currentTimestamp - previousTimestamp) / 1000
        const secondsLeftToReset = configuration.miss_tolerance_period_seconds - timeDifferentInSeconds
        if (secondsLeftToReset <= 0) {
          const message = `No more misses happened since last one. Last missed: ${missDifference}. Reset monitoring flags`
          await this.success(message)

          // Reset the miss counter if the tolerance period has passed
          previousMissCounter = currentMissCounter
          previousTimestamp = currentTimestamp
        } else {
          const message = `No more misses happened since last one. Last missed: ${missDifference}. Reset in ${secondsLeftToReset.toFixed(0)} seconds.`
          await this.warning(message)
        }
      } else {
        await this.success('No misses!');
      }

      lastMissCounter = currentMissCounter

      console.log(`🕗️${this.getMessagePrefix()} Waiting ${configuration.sleep_duration_seconds} seconds before checking again...`)
      await new Promise((resolve) => setTimeout(resolve, configuration.sleep_duration_seconds * 1000))
    }
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

  getRestAddress(): string
  {
    if (!this.restAddress) {
      for (const service of this.services) {
        if (service.type === ServiceTypeEnum.REST) {
          console.log(`🔨️${this.getMessagePrefix()} Found REST service: ${service.address}`)
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
