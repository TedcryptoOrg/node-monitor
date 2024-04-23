import EventHandler from '../../../Domain/Event/EventHandler'
import Event from '../../../Domain/Event/Event'
import MonitorDisabled from './MonitorDisabled'
import MonitorEnabled from './MonitorEnabled'
import MonitorController from '../../Monitor/MonitorController'
import MonitorUpdated from './MonitorUpdated'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../Domain/DependencyInjection/types'

@injectable()
export default class MonitorControllerEventHandler implements EventHandler {
  constructor (
    @inject(TYPES.MonitorController) private readonly monitorController: MonitorController
  ) {
  }

  async handle (event: Event): Promise<void> {
    if (event instanceof MonitorEnabled) {
      if (event.monitor.id === undefined) {
        console.error('Monitor id is undefined')
        return
      }

      this.monitorController.enableMonitor(event.monitor.id)
    } else if (event instanceof MonitorDisabled) {
      if (event.monitor.id === undefined) {
        console.error('Monitor id is undefined')
        return
      }

      this.monitorController.disableMonitor(event.monitor.id)
    } else if (event instanceof MonitorUpdated) {
      if (event.monitor.id === undefined) {
        console.error('Monitor id is undefined')
        return
      }

      this.monitorController.updateMonitor(event.monitor.id)
    }
  }

  supports (event: Event): boolean {
    return event instanceof MonitorDisabled ||
            event instanceof MonitorEnabled ||
            event instanceof MonitorUpdated
  }
}
