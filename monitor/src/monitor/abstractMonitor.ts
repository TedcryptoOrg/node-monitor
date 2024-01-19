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
  private readonly isErrored: Record<string, number|undefined> = {}

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
    const monitorName = param.constructor.name;
    attempt = attempt ?? 1;
    try {
      console.log(`🚀 ${this.name} Node checker ${monitorName} started.`);
      await promise(); // call the function to get the promise and then await it
    } catch (error: any) {
      console.log(`🚨 ${this.name} Node checker ${monitorName} failed to start. Error:\n${error}`);
      console.error(error);
      if (this.isErrored[monitorName] === undefined) {
        this.setTimer(monitorName)
      }
      this.isErrored[monitorName] = new Date().getTime();

      if (attempt >= 3 || !(error instanceof RecoverableException)) {
        attempt = 0;
        try {
          await this.alerter.alert(`🚨[${this.name}][${monitorName}] Node checker failed to start. Error:\n${error}`);
        } catch (error) {
          console.error('Alert failed to alert', error);
        }
      }

      if (error instanceof RecoverableException) {
        const sleepInterval = 5 * attempt;
        console.log(`Waiting ${sleepInterval} seconds before retrying...`);
        await new Promise(resolve => setTimeout(resolve, sleepInterval * 1000));

        await this.runPromiseWithRetry(pair, attempt+1);
      }
    }
  }

  /**
   * Sets a timer to check if the node has recovered after some seconds
   */
  setTimer (name: string): void {
    const timer = setInterval(async () => {
      const lastErrored = this.isErrored[name];
      if (
          lastErrored !== undefined
          && (new Date().getTime() - lastErrored > 60000)
      ) {
        console.log(`✅ ${this.name} Node checker ${name} recovered.`);
        this.isErrored[name] = undefined;
        await this.alerter.resolve(`✅ ${this.name} Node checker ${name} recovered.`);
        clearInterval(timer);
      }
    }, 10000);
  }
}
