import { type Monitor } from './monitor'
import { type MonitorCheck } from './checkers/monitorCheck'
import { RecoverableException } from './exception/recoverableException'

interface PromiseParamPair {
  promise: () => Promise<unknown>
  param: MonitorCheck
}

export abstract class AbstractMonitor implements Monitor {
  protected abstract readonly name: string
  protected monitor_params: MonitorCheck[] = []

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

  async runPromiseWithRetry (pair: PromiseParamPair): Promise<void> {
    const { promise, param } = pair;
    try {
      console.log(`🚀 ${this.name} Node checker ${param.constructor.name} started.`);
      await promise(); // call the function to get the promise and then await it
    } catch (error: any) {
      console.log(`🚨 ${this.name} Node checker ${param.constructor.name} failed to start. Error:\n${error}`);
      console.error(error);

      if (error instanceof RecoverableException) {
        console.log('Waiting 5 seconds before retrying...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.runPromiseWithRetry(pair);
      } else {
        //throw error; // throw the error if it's not a RecoverableException
      }
    }
  }
}
