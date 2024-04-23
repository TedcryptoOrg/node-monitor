import ConfigurationDisabled from './ConfigurationDisabled'
import ConfigurationEnabled from './ConfigurationEnabled'
import EventHandler from '../../../Domain/Event/EventHandler'
import Event from '../../../Domain/Event/Event'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../Domain/DependencyInjection/types'
import MonitorController from '../../Monitor/MonitorController'

@injectable()
export default class ConfigurationControllerEventHandler implements EventHandler<ConfigurationEnabled | ConfigurationDisabled> {
  constructor (
    @inject(TYPES.MonitorController) private readonly configurationController: MonitorController
  ) {
  }

  async handle (event: ConfigurationDisabled | ConfigurationEnabled): Promise<void> {
    if (event instanceof ConfigurationEnabled) {
      if (event.configuration.id === undefined) {
        console.error('Configuration id is undefined')
        return
      }
      this.configurationController.enableConfiguration(event.configuration.id)
    } else {
      if (event.configuration.id === undefined) {
        console.error('Configuration id is undefined')
        return
      }
      this.configurationController.disableConfiguration(event.configuration.id)
    }
  }

  supports (event: Event): boolean {
    return event instanceof ConfigurationDisabled || event instanceof ConfigurationEnabled
  }
}
