import { type AlertChannel } from '../AlertChannel/alertChannel'
import { type Configuration } from '../type/configuration'
import { BlockCheck } from './checkers/blockCheck'
import { AbstractMonitor } from './abstractMonitor'
import { UrlCheck } from './checkers/urlCheck'
import { DiskSpace } from './checkers/nodeExporter/diskSpace'
import { RpcClient } from '../client/rpcClient'
import { RestClient } from '../client/restClient'
import { type ClientInterface } from '../client/clientInterface'
import { SignMissCheck } from './checkers/signMissCheck'
import { type Chain } from '@tedcryptoorg/cosmos-directory'

export class NodeMonitor extends AbstractMonitor {
  private client: ClientInterface | undefined

  constructor (
    protected readonly name: string,
    private readonly chain: Chain,
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
      if (this.configuration.node_exporter.alerts?.disk_space?.enabled) {
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

    if (this.configuration.alerts?.sign_blocks !== undefined) {
      if (this.configuration.valoperAddress === undefined) {
        throw new Error('You need to provide a valoper address to monitor sign miss')
      }

      const client = this.getNodeClient()
      console.log(`[${this.name}] Starting sign miss check...`)
      this.monitor_params.push(new SignMissCheck(
        this.name,
        this.chain,
        this.configuration.valoperAddress,
        client,
        this.configuration.alerts.sign_blocks,
        this.alertChannels
      ))
    }
  }

  private getNodeClient (): ClientInterface {
    if (this.client === undefined) {
      if (this.configuration.rpc !== undefined) {
        this.client = new RpcClient(this.configuration.rpc)
      }
      if (this.configuration.rest !== undefined) {
        this.client = new RestClient(this.configuration.rest)
      }
    }
    if (this.client === undefined) {
      throw new Error('No client configuration found. Please configure either RPC or REST')
    }

    return this.client
  }
}