import Telegram, {TelegramBotConfiguration} from "./Clients/Telegram";
import NotificationChannelClientFactory from "../../Domain/NotificationChannel/Client/NotificationChannelClientFactory";
import NotificationChannel from "../../Domain/NotificationChannel/NotificationChannel";
import NotificationChannelClient from "../../Domain/NotificationChannel/Client/NotificationChannelClient";
import {injectable} from "inversify";

@injectable()
export default class NotificationClientFactory implements NotificationChannelClientFactory {
    createClient(notificationChannel: NotificationChannel): NotificationChannelClient
    {
        switch (notificationChannel.type) {
            case 'telegram':
                return Telegram.with(notificationChannel.configurationObject as TelegramBotConfiguration);
            default:
                throw new Error('Unknown notification channel type');
        }
    }
}
