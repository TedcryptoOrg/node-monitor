import { type Monitor } from './monitor'
import { type MonitorCheck } from './checkers/monitorCheck'
import { RecoverableException } from './exception/recoverableException'
import {AlertChannel} from "../AlertChannel/alertChannel";
import {Alerter} from "../Alerter/alerter";

interface PromiseParamPair {
  promise: () => Promise<unknown>
  param: MonitorCheck
}

export abstract class AbstractMonitor implements Monitor {
  protected abstract readonly name: string
  protected monitor_params: MonitorCheck[] = []
  private readonly alerter: Alerter

  protected constructor(protected readonly alertChannels: AlertChannel[]) {
    this.alerter = new Alerter(
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
    const { promise, param } = pair;
    attempt = attempt ?? 1;
    try {
      console.log(`🚀 ${this.name} Node checker ${param.constructor.name} started.`);
      await promise(); // call the function to get the promise and then await it
    } catch (error: any) {
      console.log(`🚨 ${this.name} Node checker ${param.constructor.name} failed to start. Error:\n${error}`);
      console.error(error);

      if (attempt >= 3 || !(error instanceof RecoverableException)) {
        try {
          await this.alerter.alert(`🚨 ${this.name} Node checker ${param.constructor.name} failed to start. Error:\n${error}`);
        } catch (error) {
          console.error('Alert failed to alert', error);
        }
      }

      if (error instanceof RecoverableException) {
        console.log('Waiting 5 seconds before retrying...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.runPromiseWithRetry(pair, attempt+1);
      }
    }
  }
}
