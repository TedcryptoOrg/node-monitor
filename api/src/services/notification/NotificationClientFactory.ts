import {NotificationChannel, NotificationChannelInput} from "../../database/models/notificationChannel";
import {TelegramBotConfiguration} from "../../type/notificationChannel/TelegramBotConfiguration";
import Telegram from "./clients/Telegram";

export default class NotificationClientFactory {
    public static createClient(notificationChannel: NotificationChannel|NotificationChannelInput)
    {
        switch (notificationChannel.type) {
            case 'telegram':
                return Telegram.with(JSON.parse(notificationChannel.configuration_object) as TelegramBotConfiguration);
            default:
                throw new Error('Unknown notification channel type');
        }
    }

    private createTelegram(notificationChannel: NotificationChannel|NotificationChannelInput) {
        const telegramBot = JSON.parse(notificationChannel.configuration_object) as TelegramBotConfiguration;
        if (!telegramBot.bot_token) {
            throw new Error('Missing bot token');
        }
        if (!telegramBot.chat_id) {
            throw new Error('Missing chat id');
        }

        return Telegram.with(JSON.parse(notificationChannel.configuration_object) as TelegramBotConfiguration);
    }
}