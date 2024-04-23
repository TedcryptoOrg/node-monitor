import CommandHandler from '../../../../Domain/Command/CommandHandler'
import DeleteConfigurationCommand from './DeleteConfigurationCommand'
import { inject, injectable } from 'inversify'
import ConfigurationRepository from '../../../../Domain/Configuration/ConfigurationRepository'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import AuditRepository from '../../../../Domain/Audit/AuditRepository'
import Audit from '../../../../Domain/Audit/Audit'

@injectable()
export default class DeleteConfigurationCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.ConfigurationRepository) private readonly configurationRepository: ConfigurationRepository,
    @inject(TYPES.AuditRepository) private readonly auditRepository: AuditRepository
  ) {}

  async handle (command: DeleteConfigurationCommand): Promise<void> {
    await this.configurationRepository.delete(command.id)

    await this.auditRepository.create(
      new Audit(
        null,
        null,
        null,
                `Configuration ${command.id} deleted`
      )
    )
  }
}
