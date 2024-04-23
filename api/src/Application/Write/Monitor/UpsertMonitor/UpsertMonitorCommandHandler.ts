import CommandHandler from '../../../../Domain/Command/CommandHandler'
import UpsertMonitorCommand from './UpsertMonitorCommand'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import AuditRepository from '../../../../Domain/Audit/AuditRepository'
import Audit from '../../../../Domain/Audit/Audit'
import ConfigurationRepository from '../../../../Domain/Configuration/ConfigurationRepository'
import MonitorRepository from '../../../../Domain/Monitor/MonitorRepository'
import Monitor from '../../../../Domain/Monitor/Monitor'
import ServerRepository from '../../../../Domain/Server/ServerRepository'
import { EventDispatcher } from '../../../../Domain/Event/EventDispatcher'
import MonitorEnabled from '../../../Event/Monitor/MonitorEnabled'
import MonitorDisabled from '../../../Event/Monitor/MonitorDisabled'
import MonitorUpdated from '../../../Event/Monitor/MonitorUpdated'

@injectable()
export default class UpsertMonitorCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.MonitorRepository) private readonly monitorRepository: MonitorRepository,
    @inject(TYPES.ConfigurationRepository) private readonly configurationRepository: ConfigurationRepository,
    @inject(TYPES.ServerRepository) private readonly serverRepository: ServerRepository,
    @inject(TYPES.AuditRepository) private readonly auditRepository: AuditRepository,
    @inject(TYPES.EventDispatcher) private readonly eventDispatcher: EventDispatcher
  ) {
  }

  async handle (command: UpsertMonitorCommand): Promise<Monitor> {
    const configuration = command.configurationId !== undefined
        ? await this.configurationRepository.get(command.configurationId)
        : null
    const server = command.serverId !== undefined
        ? await this.serverRepository.get(command.serverId)
        : null

    let previousEnabledStatus
    if (command.id !== undefined) {
      const monitorObject = await this.monitorRepository.get(command.id)
      if (monitorObject.isEnabled !== command.isEnabled) {
        previousEnabledStatus = monitorObject.isEnabled
      }
    }

    const monitor = await this.monitorRepository.upsert(new Monitor(
      command.name,
      command.type,
      command.isEnabled,
      JSON.parse(command.configurationObject),
      command.id,
      configuration ?? undefined,
      server ?? undefined,
      command.lastCheck,
      command.status,
      command.lastError
    ))

    await this.auditRepository.create(new Audit(
      configuration,
      server,
      monitor,
      command.id
        ? `Monitor ${command.name} updated`
        : `Monitor ${command.name} created`
    ))

    await this.dispatchMonitorEnabledEvent(previousEnabledStatus, monitor)
    await this.eventDispatcher.dispatch(new MonitorUpdated(monitor))

    return monitor
  }

  private async dispatchMonitorEnabledEvent (previousEnabledStatus: boolean | undefined, monitor: Monitor): Promise<void> {
    if (previousEnabledStatus === undefined || previousEnabledStatus !== monitor.isEnabled) {
      monitor.isEnabled
        ? await this.eventDispatcher.dispatch(new MonitorEnabled(monitor))
        : await this.eventDispatcher.dispatch(new MonitorDisabled(monitor))
    }
  }
}
