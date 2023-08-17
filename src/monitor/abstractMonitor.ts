import { type Monitor } from './monitor'
import { type MonitorCheck } from './checkers/monitorCheck'
import { RecoverableException } from './exception/recoverableException'

interface PromiseParamPair {
  promise: Promise<void>
  param: MonitorCheck
}

export abstract class AbstractMonitor implements Monitor {
  protected abstract readonly name: string
  protected monitor_params: MonitorCheck[] = []

  async start (param?: MonitorCheck): Promise<void> {
    const params = param === undefined ? this.monitor_params : [param]
    const promiseParamPairs = params.map(param => ({
      promise: param.check(),
      param
    }))

    for (const pair of promiseParamPairs) {
      await this.runPromiseWithRetry(pair)
    }
  }

  async runPromiseWithRetry (pair: PromiseParamPair): Promise<void> {
    const { promise, param } = pair
    try {
      await promise
    } catch (error) {
      console.log(`🚨 ${this.name} Node checker ${param.constructor.name} failed to start. Error:\n${error}`)

      if (error instanceof RecoverableException) {
        console.log('Waiting 5 seconds before retrying...')
        await new Promise(resolve => setTimeout(resolve, 5000))
        await this.runPromiseWithRetry(pair)
      }
    }
  }
}
