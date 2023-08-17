import { type AlertChannel } from '../AlertChannel/alertChannel'
import { type Configuration } from '../type/configuration'
import { RpcCheck } from './checkers/rpcCheck'
import { RestCheck } from './checkers/restCheck'
import { PrometheusCheck } from './checkers/prometheusCheck'
import { BlockCheck } from './checkers/blockCheck'
import {AbstractMonitor} from "./abstractMonitor";

export class NodeMonitor extends AbstractMonitor {
  constructor (
    protected readonly name: string,
    private readonly configuration: Configuration,
    private readonly alertChannels: AlertChannel[]
  ) {
    super();
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
}
