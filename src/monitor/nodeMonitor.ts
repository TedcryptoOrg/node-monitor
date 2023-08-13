import { type MonitorCheck } from './checkers/monitorCheck'
import { type Monitor } from './monitor'
import { type AlertChannel } from '../AlertChannel/alertChannel'
import { type Configuration } from '../type/configuration'
import { RecoverableException } from './exception/recoverableException'
import { RpcCheck } from './checkers/rpcCheck'
import { RestCheck } from './checkers/restCheck'
import { PrometheusCheck } from './checkers/prometheusCheck'
import { BlockCheck } from './checkers/blockCheck'

interface PromiseParamPair {
  promise: Promise<void>
  param: MonitorCheck
}

export class NodeMonitor implements Monitor {
  private readonly monitor_params: MonitorCheck[] = []

  constructor (
    private readonly name: string,
    private readonly configuration: Configuration,
    private readonly alertChannels: AlertChannel[]
  ) {
    console.debug(this.configuration)

    if (this.configuration.rpc !== undefined) {
      console.log(`[${this.name}] Starting RPC check...`)
      this.monitor_params.push(new RpcCheck(this.name, this.configuration.rpc, this.alertChannels))
    }
    if (this.configuration.rest !== undefined) {
      console.log(`[${this.name}] Starting REST check...`)
      this.monitor_params.push(new RestCheck(this.name, this.configuration.rest, this.alertChannels))
    }
    if (this.configuration.prometheus !== undefined) {
      console.log(`[${this.name}] Starting Prometheus check...`)
      this.monitor_params.push(new PrometheusCheck(this.name, this.configuration.prometheus, this.alertChannels))
    }
    if (this.configuration.alerts?.block !== undefined) {
      if (this.configuration.rpc === undefined) {
        throw new Error('You need to provide a RPC endpoint to monitor block')
      }
      console.log(`[${this.name}] Starting block check...`)
      this.monitor_params.push(new BlockCheck(this.name, this.configuration.chainName, this.configuration.rpc, this.configuration.alerts.block, this.alertChannels))
    }
  }

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
