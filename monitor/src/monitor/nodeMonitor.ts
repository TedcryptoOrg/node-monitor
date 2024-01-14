import {type AlertChannel} from '../AlertChannel/alertChannel'
import {BlockCheck} from './checkers/blockCheck'
import {AbstractMonitor} from './abstractMonitor'
import {UrlCheck} from './checkers/urlCheck'
import {DiskSpace} from './checkers/nodeExporter/diskSpace'
import {SignMissCheck} from './checkers/signMissCheck'
import {type Chain} from '@tedcryptoorg/cosmos-directory'
import {MissCounter} from './checkers/priceFeeder/missCounter'
import {ApiMonitor} from '../type/api/ApiMonitor'
import {ApiConfiguration} from "../type/api/ApiConfiguration";
import {ApiService} from "../type/api/ApiService";
import {MonitorTypeEnum} from "../type/api/MonitorTypeEnum";

export class NodeMonitor extends AbstractMonitor {
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
        case MonitorTypeEnum.NODE_EXPORTER_DISK_SPACE:
          this.monitor_params.push(new DiskSpace(this.name, monitor, this.alertChannels))
          break
        case MonitorTypeEnum.PRICE_FEEDER_MISS_COUNT:
          this.monitor_params.push(new MissCounter(
              this.name,
              monitor,
              this.alertChannels,
              monitor.server?.services as ApiService[]
          ))
          break
        case MonitorTypeEnum.BLOCK_CHECK:
          this.monitor_params.push(new BlockCheck(
            this.name,
            this.configuration.chain,
            monitor,
            monitor.server?.services as ApiService[],
            this.alertChannels
          ))
          break
        case MonitorTypeEnum.URL_CHECK:
          this.monitor_params.push(new UrlCheck(this.name, monitor, this.alertChannels))
          break
        case MonitorTypeEnum.SIGN_MISS_CHECK:
          this.monitor_params.push(new SignMissCheck(
            this.name,
            this.chain,
            monitor,
            monitor.server?.services as ApiService[],
            this.alertChannels
          ))
          break
      }
    }
  }
}
