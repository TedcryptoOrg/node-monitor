import CommandHandler from '../../../../Domain/Command/CommandHandler'
import DeleteMonitorCommand from './DeleteMonitorCommand'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import AuditRepository from '../../../../Domain/Audit/AuditRepository'
import Audit from '../../../../Domain/Audit/Audit'
import MonitorRepository from '../../../../Domain/Monitor/MonitorRepository'

@injectable()
export default class DeleteMonitorCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.MonitorRepository) private readonly repository: MonitorRepository,
    @inject(TYPES.AuditRepository) private readonly auditRepository: AuditRepository
  ) {}

  async handle (command: DeleteMonitorCommand): Promise<void> {
    await this.repository.delete(command.id)

    await this.auditRepository.create(
      new Audit(
        null,
        null,
        null,
                `Monitor ${command.id} deleted`
      )
    )
  }
}
