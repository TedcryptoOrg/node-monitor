import { type AlertChannel } from '../AlertChannel/alertChannel'
import { type Configuration } from '../type/configuration'
import { BlockCheck } from './checkers/blockCheck'
import { AbstractMonitor } from './abstractMonitor'
import { UrlCheck } from './checkers/urlCheck'
import {DiskSpace} from "./checkers/nodeExporter/diskSpace";

export class NodeMonitor extends AbstractMonitor {
  constructor (
    protected readonly name: string,
    private readonly configuration: Configuration,
    private readonly alertChannels: AlertChannel[]
  ) {
    super()
    console.debug(this.configuration)

    // Service check
    if (this.configuration.rpc !== undefined) {
      console.log(`[${this.name}] Starting RPC check...`)
      this.monitor_params.push(new UrlCheck(this.name, 'RPC', this.configuration.rpc.address, this.alertChannels))
    }
    if (this.configuration.rest !== undefined) {
      console.log(`[${this.name}] Starting REST check...`)
      this.monitor_params.push(new UrlCheck(this.name, 'REST', this.configuration.rest.address, this.alertChannels))
    }
    if (this.configuration.prometheus !== undefined) {
      console.log(`[${this.name}] Starting Prometheus check...`)
      this.monitor_params.push(new UrlCheck(this.name, 'Prometheus', this.configuration.prometheus.address, this.alertChannels))
    }
    if (this.configuration.node_exporter?.enabled) {
      this.monitor_params.push(
        new UrlCheck(this.name, 'NodeExporter', this.configuration.node_exporter.address, this.alertChannels)
      )
      if (this.configuration.node_exporter.alerts?.diskSpace?.enabled) {
        this.monitor_params.push(
          new DiskSpace(this.name, this.configuration.node_exporter, this.alertChannels)
        )
      }
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
