import CommandHandler from '../../../../Domain/Command/CommandHandler'
import UpsertConfigurationCommand from './UpsertConfigurationCommand'
import { inject, injectable } from 'inversify'
import ConfigurationRepository from '../../../../Domain/Configuration/ConfigurationRepository'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import Configuration from '../../../../Domain/Configuration/Configuration'
import AuditRepository from '../../../../Domain/Audit/AuditRepository'
import Audit from '../../../../Domain/Audit/Audit'

@injectable()
export default class UpsertConfigurationCommandHandler implements CommandHandler<UpsertConfigurationCommand> {
  constructor (
    @inject(TYPES.ConfigurationRepository) private readonly configurationRepository: ConfigurationRepository,
    @inject(TYPES.AuditRepository) private readonly auditRepository: AuditRepository
  ) {
  }

  async handle (command: UpsertConfigurationCommand): Promise<Configuration> {
    const configuration = await this.configurationRepository.upsert(new Configuration(
      command.name,
      command.chain,
      command.is_enabled,
      [],
      [],
      [],
      command.id
    ))

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
