import { type ApiConfiguration } from '../Infrastructure/Api/Tedcrypto/Types/ApiConfiguration'
import { Telegram } from '../AlertChannel/telegram'
import { type ApiNotificationChannel } from '../Infrastructure/Api/Tedcrypto/Types/ApiNotificationChannel'
import { NotificationChannelTypeEnum } from '../Infrastructure/Api/Tedcrypto/Types/NotificationChannelType'
import { type TelegramBotConfiguration } from '../type/notificationChannels/TelegramBotConfiguration'
import { type AlertChannel } from '../Domain/Alerter/AlertChannel'

const NotificationChannelManager = {
  async getConfigurationNotificationChannels (configuration: ApiConfiguration): Promise<AlertChannel[]> {
    const notificationChannels = configuration.notification_channels

    if (notificationChannels === undefined || notificationChannels.length === 0) {
      return []
    }

    return notificationChannels.map((notificationChannel) => {
      return this.buildNotificationChannel(notificationChannel.channel)
    })
  },

  buildNotificationChannel (notificationChannel: ApiNotificationChannel): AlertChannel {
    switch (notificationChannel.type.toString()) {
      case NotificationChannelTypeEnum.TELEGRAM.toString(): {
        const configuration = notificationChannel.configuration_object as TelegramBotConfiguration

        return new Telegram({
          token: configuration.bot_token,
          chatId: configuration.chat_id
        })
      }
      default:
        throw new Error('Unknown notification channel type: ' + notificationChannel.type)
    }
  }
}

export default NotificationChannelManager
