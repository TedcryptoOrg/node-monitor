import axios from 'axios'
import { CryptoTools } from '../../../crypto/crypto_tools'
import { type MonitorCheck } from '../monitorCheck'
import { type AlertChannel } from '../../../AlertChannel/alertChannel'
import { type Configuration } from '../../../type/configuration'
import { NoRecoverableException } from '../../exception/noRecoverableException'
import { RecoverableException } from '../../exception/recoverableException'
import { Alerter } from '../../../Alerter/alerter'
import { type PriceFeederConfiguration } from '../../../type/priceFeederConfiguration'

export class MissCounter implements MonitorCheck {
  private readonly staticEndpoints: { kujira: string, ojo: string } = {
    kujira: '/oracle/validators/%valoper%/miss',
    ojo: '/ojo/oracle/v1/validators/%valoper%/miss'
  }

  private readonly cryptoTools: CryptoTools
  private readonly priceFeederConfig: PriceFeederConfiguration
  private readonly nodeRest: string
  private readonly endpoint: string
  private readonly alerter: Alerter

  constructor (
    private readonly name: string,
    private readonly configuration: Configuration,
    private readonly alertChannels: AlertChannel[]
  ) {
    if (!Object.prototype.hasOwnProperty.call(this.staticEndpoints, name)) {
      throw new NoRecoverableException(`Blockchain ${name} not supported.`)
    }

    this.name = name
    this.cryptoTools = new CryptoTools()
    this.alertChannels = alertChannels
    this.configuration = configuration

    if (this.configuration.priceFeeder === undefined) {
      throw new NoRecoverableException('Price feeder is not defined.')
    }
    if (this.configuration.rest === undefined) {
      throw new NoRecoverableException('Rest is required for price feed.')
    }
    if (this.configuration.valoperAddress === undefined) {
      throw new NoRecoverableException('Valoper address is not defined.')
    }

    this.priceFeederConfig = this.configuration.priceFeeder
    this.nodeRest = this.configuration.rest.address
    this.endpoint = this.getEndpointUrl(this.configuration.valoperAddress)
    this.alerter = new Alerter(
      this.name,
      'MissCounter',
      this.alertChannels,
      this.priceFeederConfig.alert_sleep_duration_minutes
    )
  }

  async check (): Promise<void> {
    let previousMissCounter = await this.fetchMissCounter()
    let previousTimestamp = new Date().getTime()
    let lastMissCounter = previousMissCounter
    while (true) {
      console.log(`[${this.name}] Running miss counter check...`)
      const currentMissCounter = await this.fetchMissCounter()

      // Refresh the missing period if we are missing blocks within the period
      const missDifference = currentMissCounter - previousMissCounter
      if (currentMissCounter > lastMissCounter) {
        console.log(`[${this.name}][Miss Counter] Counter has increased, current missed in this missing period: ${missDifference}. Refreshing previous incident timestamp.`)
        previousTimestamp = new Date().getTime()

        // Check if the miss counter exceeds the tolerance
        if (missDifference >= this.priceFeederConfig.miss_tolerance) {
          console.log(`[${this.name}]Missing too many price updates...`, missDifference)

          await this.alerter.alert(`[${this.name}] 🚨 Price tracker monitor alert!\n You are missing too many blocks. Miss counter exceeded: ${missDifference}`)
        }
      } else if (missDifference > 0) {
        const currentTimestamp = new Date().getTime()

        const timeDifferentInSeconds = (currentTimestamp - previousTimestamp) / 1000
        const secondsLeftToReset = this.priceFeederConfig.miss_tolerance_period_seconds - timeDifferentInSeconds
        console.debug(`[${this.name}][Miss Counter] No more misses happened since last one. Last missed: ${missDifference}. Reset in ${secondsLeftToReset} seconds.`)
        if (secondsLeftToReset <= 0) {
          console.log(`[${this.name}][Miss Counter] No more misses happened since last one. Last missed: ${missDifference}. Reset monitoring flags`)
          // Reset the miss counter if the tolerance period has passed
          previousMissCounter = currentMissCounter
          previousTimestamp = currentTimestamp
        }
      }

      lastMissCounter = currentMissCounter

      if (process.env.APP_ENV === 'test') {
        break
      }

      // Sleep for the specified duration
      // @ts-expect-error is already checked, but it keeps complaining
      await new Promise((resolve) => setTimeout(resolve, this.configuration.priceFeeder.sleep_duration_seconds * 1000))
    }
  }

  async fetchMissCounter (): Promise<number> {
    try {
      const response = await axios.get(this.nodeRest + this.endpoint)

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
