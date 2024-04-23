import CommandHandler from '../../../../Domain/Command/CommandHandler'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import NotificationChannelRepository from '../../../../Domain/NotificationChannel/NotificationChannelRepository'
import GetNotificationChannelCommand from './GetNotificationChannelCommand'
import NotificationChannel from '../../../../Domain/NotificationChannel/NotificationChannel'

@injectable()
export default class GetNotificationChannelCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.NotificationChannelRepository) private readonly notificationChannelRepository: NotificationChannelRepository
  ) {}

  async handle (command: GetNotificationChannelCommand): Promise<NotificationChannel> {
    return await this.notificationChannelRepository.get(command.id)
  }
}
