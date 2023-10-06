import { type AlertChannel } from '../AlertChannel/alertChannel'
import { BlockCheck } from './checkers/blockCheck'
import { AbstractMonitor } from './abstractMonitor'
import { UrlCheck } from './checkers/urlCheck'
import { DiskSpace } from './checkers/nodeExporter/diskSpace'
import { RpcClient } from '../client/rpcClient'
import { RestClient } from '../client/restClient'
import { type ClientInterface } from '../client/clientInterface'
import { SignMissCheck } from './checkers/signMissCheck'
import { type Chain } from '@tedcryptoorg/cosmos-directory'
import {ConfigurationOutput} from "../database/models/configuration";
import {monitorTypes} from "../database/models/monitor";
import {MissCounter} from "./checkers/priceFeeder/missCounter";

export class NodeMonitor extends AbstractMonitor {
  private rpcClient: ClientInterface | undefined
  private restClient: ClientInterface | undefined

  constructor (
    protected readonly name: string,
    private readonly chain: Chain,
    private readonly configuration: ConfigurationOutput,
    private readonly alertChannels: AlertChannel[]
  ) {
    super()
    console.debug(this.configuration)

    configuration.getMonitors().then((monitors) => {
        monitors.forEach((monitor) => {
            console.log(`[${this.name}] Loaded monitor: ${monitor.name}`)
            const monitorConfiguration = JSON.parse(monitor.configuration_object);
            if (monitorConfiguration === undefined) {
                throw new Error(`[${this.name}][${monitor.name}] Monitor configuration is not defined.`)
            }
            switch(monitor.type) {
                case monitorTypes.nodeExporterDiskSpace.name:
                    this.monitor_params.push(new DiskSpace(this.name, monitorConfiguration, this.alertChannels))
                    break;
                case monitorTypes.priceFeederMissCount.name:
                    this.monitor_params.push(new MissCounter(this.name, monitorConfiguration, this.alertChannels))
                    break;
                case monitorTypes.blockCheck.name:
                    this.monitor_params.push(new BlockCheck(
                        this.name,
                        this.configuration.chain,
                        this.getRpcClient(monitorConfiguration),
                        monitorConfiguration,
                        this.alertChannels
                    ))
                    break;
                case monitorTypes.urlCheck.name:
                    this.monitor_params.push(new UrlCheck(this.name, monitorConfiguration, this.alertChannels))
                    break;
                case monitorTypes.signMissCheck.name:
                    this.monitor_params.push(new SignMissCheck(
                        this.name,
                        this.chain,
                        monitorConfiguration,
                        this.getNodeClient(monitorConfiguration),
                        this.alertChannels
                    ))
            }
        })
    });
  }

  private getRpcClient (monitorConfiguration: any): RpcClient {
    const client = this.getNodeClient(monitorConfiguration, 'rpc');
    if (client instanceof RpcClient) {
        return client;
    }

    throw new Error('No rpc client found.')
  }

  private getNodeClient (monitorConfiguration: any, type?: string): ClientInterface {
    if (this.rpcClient === undefined) {
      if (monitorConfiguration.rpc !== undefined) {
        this.rpcClient = new RpcClient(monitorConfiguration.rpc)
      }
    }
    if (this.restClient === undefined) {
      if (monitorConfiguration.rest !== undefined) {
        this.restClient = new RestClient(monitorConfiguration.rest)
      }
    }

    if (type === 'rpc' && this.rpcClient === undefined) {
        throw new Error('No rpc client found.')
    }
    if (type === 'rest' && this.restClient === undefined) {
        throw new Error('No rest client found.')
    }

    const client = this.rpcClient || this.restClient;
    if (client === undefined) {
        throw new Error('No client found.')
    }

    return client;
  }
}
