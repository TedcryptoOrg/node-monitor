import MonitorController from '../../Application/Monitor/MonitorController'
import { inject, injectable } from 'inversify'
import { PARAMS } from '../DependencyInjection/params'
import WsWebsocketClient from '../Websocket/WsWebsocketClient'

@injectable()
export default class WsMonitorController implements MonitorController {
  private readonly wsClient: WsWebsocketClient

  constructor (
    @inject(PARAMS.wsMonitorAddress) readonly wsMonitorAddress: string
  ) {
    this.wsClient = new WsWebsocketClient(wsMonitorAddress)
  }

  updateMonitor (monitorId: number): void {
    console.debug('Updating monitor', monitorId)
    this.wsClient.send({
      id: monitorId,
      event: 'monitor_updated'
    })
  }

  enableMonitor (monitorId: number): void {
    console.debug('Enabling monitor', monitorId)
    this.wsClient.send({
      id: monitorId,
      event: 'monitor_enabled'
    })
  }

  disableMonitor (monitorId: number): void {
    console.debug('Disabling monitor', monitorId)
    this.wsClient.send({
      id: monitorId,
      event: 'monitor_disabled'
    })
  }

  enableConfiguration (configurationId: number): void {
    console.debug('Enabling configuration', configurationId)
    this.wsClient.send({
      id: configurationId,
      event: 'configuration_enabled'
    })
  }

  disableConfiguration (configurationId: number): void {
    console.debug('Disabling configuration', configurationId)
    this.wsClient.send({
      id: configurationId,
      event: 'configuration_disabled'
    })
  }
}
