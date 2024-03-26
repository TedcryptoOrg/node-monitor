import { type MonitorCheck } from './checkers/monitorCheck'
import { RecoverableException } from '../Domain/RecoverableException'
import { type AlertChannel } from '../Domain/Alerter/AlertChannel'
import { OldAlerter } from '../Alerter/OldAlerter'
import { type OldChecker } from '../Domain/Checker/OldChecker'

interface PromiseParamPair {
  promise: () => Promise<unknown>
  param: MonitorCheck
}

export abstract class AbstractMonitor implements OldChecker {
  protected monitor_params: MonitorCheck[] = []
  private readonly alerter: OldAlerter
  private readonly isErrored: Record<string, number | undefined> = {}

  protected constructor (
    protected readonly alertChannels: AlertChannel[],
    protected readonly name: string
  ) {
    this.alerter = new OldAlerter(
      'General',
      'General',
      this.alertChannels,
      1
    )
  }

  async start (param?: MonitorCheck): Promise<void> {
    const params = param === undefined ? this.monitor_params : [param]
    const promiseParamPairs = params.map(param => ({
      promise: param.check.bind(param), // pass the check method itself
      param
    }))

    for (const pair of promiseParamPairs) {
      this.runPromiseWithRetry(pair)
    }
  }

  async runPromiseWithRetry (pair: PromiseParamPair, attempt?: number): Promise<void> {
    const { promise, param } = pair
    const monitorName = param.constructor.name
    attempt = attempt ?? 1
    try {
      console.log(`🚀 ${this.name} Node checker ${monitorName} started.`)
      await promise() // call the function to get the promise and then await it
    } catch (error: any) {
      console.log(`🚨 ${this.name} Node checker ${monitorName} failed to start. Error:\n${error}`)
      console.error(error)
      this.isErrored[monitorName] = new Date().getTime()

      if (attempt >= 3 || !(error instanceof RecoverableException)) {
        attempt = 0
        try {
          await this.alerter?.alert(`🚨[${this.name}][${monitorName}] Node checker failed to start. Error:\n${error}`)
          if (attempt === 3) {
            // start the timer to check if resolved, only on 3rd attempt
            this.setTimer(monitorName)
          }
        } catch (error) {
          console.error('Alert failed to alert', error)
        }
      }

      if (error instanceof RecoverableException) {
        const sleepInterval = 5 * attempt
        console.log(`Waiting ${sleepInterval} seconds before retrying...`)
        await new Promise(resolve => setTimeout(resolve, sleepInterval * 1000))

        await this.runPromiseWithRetry(pair, attempt + 1)
      }
    }
  }

  /**
   * Sets a timer to check if the node has recovered after some seconds
   */
  setTimer (name: string): void {
    const timer = setInterval(async () => {
      const lastErrored = this.isErrored[name]
      if (
        lastErrored !== undefined &&
          (new Date().getTime() - lastErrored > 60000)
      ) {
        console.log(`✅ ${this.name} Node checker ${name} recovered.`)
        this.isErrored[name] = undefined
        await this.alerter?.resolve(`✅ ${this.name} Node checker ${name} recovered.`)
        clearInterval(timer)
      }
    }, 10000)
  }
}
