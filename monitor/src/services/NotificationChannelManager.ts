import {ApiConfiguration} from "../type/api/ApiConfiguration";
import {Telegram} from "../AlertChannel/telegram";
import {ApiNotificationChannel} from "../type/api/ApiNotificationChannel";
import {NotificationChannelTypeEnum} from "../type/api/NotificationChannelType";
import {TelegramBotConfiguration} from "../type/notificationChannels/TelegramBotConfiguration";
import {AlertChannel} from "../AlertChannel/alertChannel";

export default class NotificationChannelManager {
    static async getConfigurationNotificationChannels(configuration: ApiConfiguration): Promise<AlertChannel[]> {
        const notificationChannels = configuration.notification_channels

        if (notificationChannels === undefined || notificationChannels.length === 0) {
            return []
        }

        return notificationChannels.map((notificationChannel) => {
            return this.buildNotificationChannel(notificationChannel.channel)
        })
    }

    private static buildNotificationChannel(notificationChannel: ApiNotificationChannel): AlertChannel {
        switch (notificationChannel.type) {
            case NotificationChannelTypeEnum.TELEGRAM:
                const configuration = notificationChannel.configuration_object as TelegramBotConfiguration

                return new Telegram({
                    token: configuration.bot_token,
                    chatId: configuration.chat_id
                })
        }
    }
}