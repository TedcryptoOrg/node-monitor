import { type AlertChannel } from '../AlertChannel/alertChannel'
import { type Configuration } from '../type/configuration'
import { AbstractMonitor } from './abstractMonitor'
import { UrlCheck } from './checkers/urlCheck'

export class NodeExportMonitor extends AbstractMonitor {
  constructor (
    protected readonly name: string,
    private readonly configuration: Configuration,
    private readonly alertChannels: AlertChannel[]
  ) {
    super()
    console.debug(this.configuration)
    if (this.configuration.node_exporter !== undefined) {
      this.monitor_params.push(
        new UrlCheck(this.name, 'NodeExporter', this.configuration.node_exporter.address, this.alertChannels)
      )
    }
  }
}
