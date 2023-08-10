import axios from 'axios'
import { CryptoTools } from '../../crypto/crypto_tools'
import { type MonitorCheck } from './monitorCheck'
import { type AlertChannel } from '../../AlertChannel/alertChannel'
import { type Configuration } from '../../type/configuration'

export class MissCounter implements MonitorCheck {
  private readonly staticEndpoints: { kujira: string, ojo: string } = {
    kujira: '/oracle/validators/%valoper%/miss',
    ojo: '/ojo/oracle/v1/validators/%valoper%/miss'
  }

  private readonly cryptoTools: CryptoTools

  constructor (
    private readonly name: string,
    private readonly configuration: Configuration,
    private readonly alertChannels: AlertChannel[]
  ) {
    if (!Object.prototype.hasOwnProperty.call(this.staticEndpoints, name)) {
      throw new Error(`Blockchain ${name} not supported.`)
    }

    this.name = name
    this.cryptoTools = new CryptoTools()
    this.alertChannels = alertChannels
    this.configuration = configuration
  }

  async check (): Promise<void> {
    if (this.configuration.nodeRest === undefined) {
      throw new Error('Node rest is not defined.')
    }
    if (this.configuration.valoperAddress === undefined) {
      throw new Error('Valoper address is not defined.')
    }
    if (this.configuration.priceFeeder === undefined) {
      throw new Error('Price feeder is not defined.')
    }

    let previousMissCounter = await this.fetchMissCounter(
      this.configuration.nodeRest,
      this.configuration.valoperAddress
    )

    let previousTimestamp = new Date().getTime()
    let lastMissCounter = previousMissCounter
    let lastAlertedPeriod = 0
    let reset = false
    while (true) {
      console.log('Running miss counter check...')
      const currentMissCounter = await this.fetchMissCounter(
        this.configuration.nodeRest,
        this.configuration.valoperAddress
      )

      // Check if the miss counter exceeds the tolerance
      const missDifference = currentMissCounter - previousMissCounter
      if (missDifference >= this.configuration.priceFeeder.miss_tolerance) {
        console.log('Missing too many price updates...')
        const timeDifference = new Date().getTime() - lastAlertedPeriod
        if (timeDifference / 1000 > this.configuration.priceFeeder.alert_sleep_duration) {
          // loop alertChannels and alert
          for (const alerter of this.alertChannels) {
            await alerter.alert(`🚨 ${this.name} Price tracker monitor alert!\n You are missing too many blocks. Miss counter exceeded: ${missDifference}`)
          }
          lastAlertedPeriod = new Date().getTime()
          previousMissCounter = currentMissCounter
        } else {
          console.log('[Miss Counter] Alert message sent too recently. Skipping.')
        }
      }

      const currentTimestamp = new Date().getTime()

      // Refresh the missing period if we are missing blocks within the period
      if (currentMissCounter > lastMissCounter) {
        console.log(`[Miss Counter] Missing counter has increased, current missed: ${currentMissCounter - previousMissCounter}. Refreshing previous incident timestamp.`)
        previousTimestamp = new Date().getTime()
        reset = true
      }

      const timeDifference = currentTimestamp - previousTimestamp
      if (reset && timeDifference / 1000 > this.configuration.priceFeeder.miss_tolerance_period) {
        console.log(`[Miss Counter] No more misses happened since last one. Last missed: ${currentMissCounter - previousMissCounter}. Reset monitoring flags`)
        // Reset the miss counter if the tolerance period has passed
        previousMissCounter = currentMissCounter
        previousTimestamp = currentTimestamp
        reset = false
      }

      lastMissCounter = currentMissCounter

      if (process.env.APP_ENV === 'test') {
        break
      }

      // Sleep for the specified duration
      // @ts-expect-error is already checked but it keeps complaining
      await new Promise((resolve) => setTimeout(resolve, this.configuration.priceFeeder.sleep_duration * 1000))
    }
  }

  async fetchMissCounter (nodeRest: string, valoperAddress: string): Promise<number> {
    const endpoint = this.getEndpointUrl(valoperAddress)
    try {
      const response = await axios.get(nodeRest + endpoint)

      return response.data.miss_counter
    } catch (error: any) {
      console.error(error);
      throw new Error('Error fetching miss counter. Error: ' + error.message)
    }
  }

  private getEndpointUrl (valoperAddress: string): string {
    const chain = this.cryptoTools.getChainFromBech32Address(valoperAddress)

    for (const [key, value] of Object.entries(this.staticEndpoints)) {
      if (chain?.startsWith(key)) {
        return value.replace('%valoper%', valoperAddress)
      }
    }

    throw new Error('No endpoint found for chain: ' + (chain ?? 'unknown'))
  }
}
