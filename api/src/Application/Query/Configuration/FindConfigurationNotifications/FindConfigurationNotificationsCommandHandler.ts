import { inject, injectable } from 'inversify'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import ConfigurationNotificationRepository from '../../../../Domain/Configuration/ConfigurationNotificationRepository'
import ConfigurationNotification from '../../../../Domain/Configuration/ConfigurationNotification'
import FindConfigurationNotificationsCommand from './FindConfigurationNotificationsCommand'
import { TYPES } from '../../../../Domain/DependencyInjection/types'

@injectable()
export default class FindConfigurationNotificationsCommandHandler implements CommandHandler<FindConfigurationNotificationsCommand> {
  constructor (
    @inject(TYPES.ConfigurationNotificationRepository) private readonly repository: ConfigurationNotificationRepository
  ) {
  }

  async handle (command: FindConfigurationNotificationsCommand): Promise<ConfigurationNotification[]> {
    return await this.repository.findByConfigurationId(command.configurationId)
  }
}
