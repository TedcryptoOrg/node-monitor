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
import { MissCounter } from './checkers/priceFeeder/missCounter'
import {ApiMonitor } from '../type/api/ApiMonitor'
import {ApiConfiguration} from "../type/api/ApiConfiguration";
import {ApiService} from "../type/api/ApiService";
import {ServiceTypeEnum} from "../type/api/ServiceTypeEnum";

const monitorTypes = {
  urlCheck: {
    name: 'urlCheck',
    description: 'Monitor that a specific url is alive (this is automatically added to services created)',
  },
  blockCheck: {
    name: 'blockCheck',
    description: 'Check how many blocks were missed over a period'
  },
  signMissCheck: {
    name: 'signMissCheck',
    description: 'Check how much blocks were not signed over a period',
  },
  priceFeederMissCount: {
    name: 'priceFeederMissCount',
    description: 'Blocks missed in the price feeder over a period',
  },
  nodeExporterDiskSpace: {
    name: 'nodeExporterDiskSpace',
    description: 'Disk space left',
  },
}

export class NodeMonitor extends AbstractMonitor {
  private rpcClient: ClientInterface | undefined
  private restClient: ClientInterface | undefined

  constructor (
    protected readonly name: string,
    private readonly chain: Chain,
    private readonly configuration: ApiConfiguration,
    private readonly monitors: ApiMonitor[],
    private readonly services: ApiService[],
    protected readonly alertChannels: AlertChannel[]
  ) {
    super(alertChannels)

    for (const monitor of monitors) {
      if (!monitor.is_enabled) {
        console.log(`❌️ [${this.name}] Monitor ${monitor.name} is disabled. Skipping...`)
        continue
      }

      console.log(`😊️[${this.name}] Loaded monitor: ${monitor.name}`)
      const monitorConfiguration = JSON.parse(monitor.configuration_object)
      if (monitorConfiguration === undefined) {
        throw new Error(`❌️ [${this.name}][${monitor.name}] Monitor configuration is not defined.`)
      }
      switch (monitor.type) {
        case monitorTypes.nodeExporterDiskSpace.name:
          this.monitor_params.push(new DiskSpace(this.name, monitorConfiguration, this.alertChannels))
          break
        case monitorTypes.priceFeederMissCount.name:
          this.monitor_params.push(new MissCounter(this.name, monitorConfiguration, this.alertChannels))
          break
        case monitorTypes.blockCheck.name:
          this.monitor_params.push(new BlockCheck(
            this.name,
            this.configuration.chain,
            this.getRpcClient(monitorConfiguration),
            monitorConfiguration,
            this.alertChannels
          ))
          break
        case monitorTypes.urlCheck.name:
          this.monitor_params.push(new UrlCheck(this.name, monitorConfiguration, this.alertChannels))
          break
        case monitorTypes.signMissCheck.name:
          this.monitor_params.push(new SignMissCheck(
            this.name,
            this.chain,
            monitorConfiguration,
            this.getNodeClient(monitorConfiguration),
            this.alertChannels
          ))
          break
      }
    }
  }

  private getRpcClient (monitorConfiguration: any): RpcClient {
    const client = this.getNodeClient(monitorConfiguration, 'rpc')
    if (client instanceof RpcClient) {
      return client
    }

    throw new Error('No rpc client found.')
  }

  private getNodeClient (monitorConfiguration: any, type?: string): ClientInterface {
    if (this.rpcClient === undefined) {
      for (const apiService of this.services) {
        if (apiService.is_enabled && apiService.type === ServiceTypeEnum.RPC) {
          this.rpcClient = new RpcClient({address: apiService.address})
          break;
        }
      }
    }

    if (this.restClient === undefined) {
      if (monitorConfiguration.rest !== undefined) {
        for (const apiService of this.services) {
          if (apiService.is_enabled && apiService.type === ServiceTypeEnum.REST) {
            this.rpcClient = new RestClient({address: apiService.address})
            break;
          }
        }
      }
    }

    if (type === 'rpc' && this.rpcClient === undefined) {
      throw new Error('No rpc client found.')
    }
    if (type === 'rest' && this.restClient === undefined) {
      throw new Error('No rest client found.')
    }

    const client = this.rpcClient ?? this.restClient
    if (client === undefined) {
      throw new Error('No client found.')
    }

    return client
  }
}
