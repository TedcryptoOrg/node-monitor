import NotificationChannel from "../NotificationChannel";
import NotificationChannelClient from "./NotificationChannelClient";

export default interface NotificationChannelClientFactory {
    createClient(notificationChannel: NotificationChannel): NotificationChannelClient
}
