import axios from 'axios'
import { CryptoTools } from '../../../crypto/crypto_tools'
import { type MonitorCheck } from '../monitorCheck'
import { type AlertChannel } from '../../../AlertChannel/alertChannel'
import { NoRecoverableException } from '../../exception/noRecoverableException'
import { RecoverableException } from '../../exception/recoverableException'
import { Alerter } from '../../../Alerter/alerter'
import {PriceFeederMissCountConfiguration} from "../../../type/api/ApiMonitor";

export class MissCounter implements MonitorCheck {
  private readonly staticEndpoints: { kujira: string, ojo: string } = {
    kujira: '/oracle/validators/%valoper%/miss',
    ojo: '/ojo/oracle/v1/validators/%valoper%/miss'
  }

  private readonly cryptoTools: CryptoTools
  private readonly endpoint: string
  private readonly alerter: Alerter

  constructor (
    private readonly name: string,
    private readonly configuration: PriceFeederMissCountConfiguration,
    private readonly alertChannels: AlertChannel[]
  ) {
    console.debug(`🔨️[${this.name}] Creating miss counter check...`, configuration)

    if (!Object.prototype.hasOwnProperty.call(this.staticEndpoints, name)) {
      throw new NoRecoverableException(`Blockchain ${name} not supported.`)
    }

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
    let previousMissCounter = await this.fetchMissCounter()
    let previousTimestamp = new Date().getTime()
    let lastMissCounter = previousMissCounter
    while (true) {
      console.log(`🏃️[${this.name}] Running miss counter check...`)
      const currentMissCounter = await this.fetchMissCounter()

      // Refresh the missing period if we are missing blocks within the period
      const missDifference = currentMissCounter - previousMissCounter
      if (currentMissCounter > lastMissCounter) {
        console.log(`🟡️[${this.name}][Price Feeder Miss] Counter has increased, current missed in this missing period: ${missDifference}. Refreshing previous incident timestamp.`)
        previousTimestamp = new Date().getTime()

        // Check if the miss counter exceeds the tolerance
        if (missDifference >= this.configuration.miss_tolerance) {
          console.log(`🔴️[${this.name}]Missing too many price updates...`, missDifference)

          await this.alerter.alert(`[${this.name}] 🚨 Price tracker monitor alert!\n You are missing too many blocks. Miss counter exceeded: ${missDifference}`)
        }
      } else if (missDifference > 0) {
        const currentTimestamp = new Date().getTime()

        const timeDifferentInSeconds = (currentTimestamp - previousTimestamp) / 1000
        const secondsLeftToReset = this.configuration.miss_tolerance_period_seconds - timeDifferentInSeconds
        console.debug(`🟡️[${this.name}][Price Feeder Miss] No more misses happened since last one. Last missed: ${missDifference}. Reset in ${secondsLeftToReset} seconds.`)
        if (secondsLeftToReset <= 0) {
          console.log(`🟢️[${this.name}][Price Feeder Miss] No more misses happened since last one. Last missed: ${missDifference}. Reset monitoring flags`)
          // Reset the miss counter if the tolerance period has passed
          previousMissCounter = currentMissCounter
          previousTimestamp = currentTimestamp
        }
      } else {
        console.log(`🟢️[${this.name}][Price Feeder Miss] No misses!`)
      }

      lastMissCounter = currentMissCounter

      if (process.env.APP_ENV === 'test') {
        break
      }

      console.log(`🕗️[${this.name}][Price Feeder Miss] Waiting ${this.configuration.sleep_duration_seconds} seconds before checking again...`)
      await new Promise((resolve) => setTimeout(resolve, this.configuration.sleep_duration_seconds * 1000))
    }
  }

  async fetchMissCounter (): Promise<number> {
    try {
      const response = await axios.get(this.configuration.rest_address + this.endpoint)

      return Number(response.data.miss_counter)
    } catch (error: any) {
      console.error(error)
      throw new RecoverableException('Error fetching miss counter. Error: ' + error.message)
    }
  }

  private getEndpointUrl (valoperAddress: string): string {
    const chain = this.cryptoTools.getChainFromBech32Address(valoperAddress)

    for (const [key, value] of Object.entries(this.staticEndpoints)) {
      if (chain?.startsWith(key)) {
        return value.replace('%valoper%', valoperAddress)
      }
    }

    throw new NoRecoverableException('No endpoint found for chain: ' + (chain ?? 'unknown'))
  }
}
