import CommandHandler from '../../../../Domain/Command/CommandHandler'
import DeleteNotificationChannelCommand from './DeleteNotificationChannelCommand'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import AuditRepository from '../../../../Domain/Audit/AuditRepository'
import Audit from '../../../../Domain/Audit/Audit'
import NotificationChannelRepository from '../../../../Domain/NotificationChannel/NotificationChannelRepository'

@injectable()
export default class DeleteNotificationChannelCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.NotificationChannelRepository) private readonly repository: NotificationChannelRepository,
    @inject(TYPES.AuditRepository) private readonly auditRepository: AuditRepository
  ) {}

  async handle (command: DeleteNotificationChannelCommand): Promise<void> {
    await this.repository.delete(command.id)

    await this.auditRepository.create(
      new Audit(
        null,
        null,
        null,
                `Notification channel ${command.id} deleted`
      )
    )
  }
}
