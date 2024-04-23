import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import AssociateNotificationChannelCommand from './AssociateNotificationChannelCommand'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import ConfigurationRepository from '../../../../Domain/Configuration/ConfigurationRepository'
import NotificationChannelRepository from '../../../../Domain/NotificationChannel/NotificationChannelRepository'
import ConfigurationNotificationRepository from '../../../../Domain/Configuration/ConfigurationNotificationRepository'
import ConfigurationNotification from '../../../../Domain/Configuration/ConfigurationNotification'
import AuditRepository from '../../../../Domain/Audit/AuditRepository'
import Audit from '../../../../Domain/Audit/Audit'

@injectable()
export default class AssociateNotificationChannelCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.ConfigurationRepository) private readonly configurationRepository: ConfigurationRepository,
    @inject(TYPES.NotificationChannelRepository) private readonly notificationChannelRepository: NotificationChannelRepository,
    @inject(TYPES.ConfigurationNotificationRepository) private readonly configurationNotificationRepository: ConfigurationNotificationRepository,
    @inject(TYPES.AuditRepository) private readonly auditRepository: AuditRepository
  ) {
  }

  async handle (command: AssociateNotificationChannelCommand): Promise<ConfigurationNotification> {
    const configuration = await this.configurationRepository.get(command.configurationId)
    const notificationChannel = await this.notificationChannelRepository.get(command.notificationChannelId)

    const configurationNotification = await this.configurationNotificationRepository.upsert(
      new ConfigurationNotification(configuration, notificationChannel)
    )

    await this.auditRepository.create(new Audit(
      configuration,
      null,
      null,
            `Notification channel ${notificationChannel.name} associated to configuration ${configuration.name}`
    ))

    return configurationNotification
  }
}
