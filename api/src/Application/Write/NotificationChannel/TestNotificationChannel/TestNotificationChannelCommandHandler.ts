import CommandHandler from '../../../../Domain/Command/CommandHandler'
import { inject, injectable } from 'inversify'
import TestNotificationChannelCommand from './TestNotificationChannelCommand'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import NotificationChannelClientFactory
  from '../../../../Domain/NotificationChannel/Client/NotificationChannelClientFactory'

@injectable()
export default class TestNotificationChannelCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.NotificationChannelClientFactory) private readonly notificationClientFactory: NotificationChannelClientFactory
  ) {
  }

  async handle (command: TestNotificationChannelCommand): Promise<void> {
    await this.notificationClientFactory.createClient(command.notificationChannel)
      .send(`Test ${command.notificationChannel.name} notification channel successful!`)
  }
}
