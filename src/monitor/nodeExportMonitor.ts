import { type AlertChannel } from '../AlertChannel/alertChannel'
import { type Configuration } from '../type/configuration'
import {AbstractMonitor} from "./abstractMonitor";

export class NodeExportMonitor extends AbstractMonitor {
  constructor (
    protected readonly name: string,
    private readonly configuration: Configuration,
    private readonly alertChannels: AlertChannel[]
  ) {
    super();
    console.debug(this.configuration)

  }
}
