import CommandHandler from '../../../../Domain/Command/CommandHandler'
import DeleteServerCommand from './DeleteServerCommand'
import { inject, injectable } from 'inversify'
import ServerRepository from '../../../../Domain/Server/ServerRepository'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import AuditRepository from '../../../../Domain/Audit/AuditRepository'
import Audit from '../../../../Domain/Audit/Audit'

@injectable()
export default class DeleteServerCommandHandler implements CommandHandler<DeleteServerCommand> {
  constructor (
    @inject(TYPES.ServerRepository) private readonly repository: ServerRepository,
    @inject(TYPES.AuditRepository) private readonly auditRepository: AuditRepository
  ) {}

  async handle (command: DeleteServerCommand): Promise<void> {
    await this.repository.delete(command.id)

    await this.auditRepository.create(
      new Audit(
        null,
        null,
        null,
                `Server ${command.id} deleted`
      )
    )
  }
}
