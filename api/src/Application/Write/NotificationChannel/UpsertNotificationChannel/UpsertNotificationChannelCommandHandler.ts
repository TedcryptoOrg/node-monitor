import CommandHandler from '../../../../Domain/Command/CommandHandler'
import { inject, injectable } from 'inversify'
import UpsertNotificationChannelCommand from './UpsertNotificationChannelCommand'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import NotificationChannelRepository from '../../../../Domain/NotificationChannel/NotificationChannelRepository'
import AuditRepository from '../../../../Domain/Audit/AuditRepository'
import NotificationChannel from '../../../../Domain/NotificationChannel/NotificationChannel'
import Audit from '../../../../Domain/Audit/Audit'

@injectable()
export default class UpsertNotificationChannelCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.NotificationChannelRepository) private readonly notificationChannelRepository: NotificationChannelRepository,
    @inject(TYPES.AuditRepository) private readonly auditRepository: AuditRepository
  ) {
  }

  async handle (command: UpsertNotificationChannelCommand): Promise<any> {
    // TODO: validate configuration object based on the type
    const notificationChannel = await this.notificationChannelRepository.upsert(
      new NotificationChannel(
        command.name,
        command.type,
        JSON.parse(command.configurationObject) as object,
        command.isEnabled,
        command.id
      )
    )

    await this.auditRepository.create(
      new Audit(
        null,
        null,
        null,
                `Notification channel ${notificationChannel.name} ${(command.id !== undefined ? 'edited' : 'created')}`
      )
    )
  }
}
