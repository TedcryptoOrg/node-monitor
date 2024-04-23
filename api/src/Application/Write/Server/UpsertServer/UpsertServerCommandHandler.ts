import CommandHandler from '../../../../Domain/Command/CommandHandler'
import UpsertServerCommand from './UpsertServerCommand'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import AuditRepository from '../../../../Domain/Audit/AuditRepository'
import Audit from '../../../../Domain/Audit/Audit'
import ServerRepository from '../../../../Domain/Server/ServerRepository'
import Server from '../../../../Domain/Server/Server'
import ConfigurationRepository from '../../../../Domain/Configuration/ConfigurationRepository'

@injectable()
export default class UpsertServerCommandHandler implements CommandHandler<UpsertServerCommand> {
  constructor (
    @inject(TYPES.ServerRepository) private readonly serverRepository: ServerRepository,
    @inject(TYPES.ConfigurationRepository) private readonly configurationRepository: ConfigurationRepository,
    @inject(TYPES.AuditRepository) private readonly auditRepository: AuditRepository
  ) {
  }

  async handle (command: UpsertServerCommand): Promise<Server> {
    const configuration = await this.configurationRepository.get(command.configurationId)

    const server = await this.serverRepository.upsert(new Server(
      command.name,
      command.address,
      command.isEnabled,
      configuration,
      [],
      command.id
    ))

    await this.auditRepository.create(new Audit(
      configuration,
      null,
      null,
      command.id !== undefined
        ? `Server ${configuration.name} updated`
        : `server ${configuration.name} created`
    ))

    return server
  }
}
