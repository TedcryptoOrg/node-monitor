import CommandHandler from '../../../../Domain/Command/CommandHandler'
import UpsertConfigurationCommand from './UpsertConfigurationCommand'
import { inject, injectable } from 'inversify'
import ConfigurationRepository from '../../../../Domain/Configuration/ConfigurationRepository'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import Configuration from '../../../../Domain/Configuration/Configuration'
import AuditRepository from '../../../../Domain/Audit/AuditRepository'
import Audit from '../../../../Domain/Audit/Audit'
import EventDispatcher from '../../../Event/EventDispatcher'
import ConfigurationEnabled from '../../../Event/Configuration/ConfigurationEnabled'
import ConfigurationDisabled from '../../../Event/Configuration/ConfigurationDisabled'

@injectable()
export default class UpsertConfigurationCommandHandler implements CommandHandler<UpsertConfigurationCommand> {
  constructor (
    @inject(TYPES.ConfigurationRepository) private readonly configurationRepository: ConfigurationRepository,
    @inject(TYPES.AuditRepository) private readonly auditRepository: AuditRepository,
    @inject(TYPES.EventDispatcher) private readonly eventDispatcher: EventDispatcher
  ) {
  }

  async handle (command: UpsertConfigurationCommand): Promise<Configuration> {
    let lastState = false
    if (command.id !== undefined) {
      lastState = (await this.configurationRepository.get(command.id)).is_enabled
    }

    const configuration = await this.configurationRepository.upsert(new Configuration(
      command.name,
      command.chain,
      command.is_enabled,
      [],
      [],
      [],
      command.id
    ))

    if (lastState !== configuration.is_enabled) {
      configuration.is_enabled
        ? await this.eventDispatcher.dispatch(new ConfigurationEnabled(configuration))
        : await this.eventDispatcher.dispatch(new ConfigurationDisabled(configuration))
    }

    await this.auditRepository.create(new Audit(
      configuration,
      null,
      null,
      command.id !== undefined
        ? `Configuration ${configuration.name} updated`
        : `Configuration ${configuration.name} created`
    ))

    return configuration
  }
}
