import NotificationChannelClient from "../../../src/Domain/NotificationChannel/Client/NotificationChannelClient";
import NotificationChannel from "../../../src/Domain/NotificationChannel/NotificationChannel";
import NotificationClientFactory from "../../../src/Infrastructure/NotificationChannel/NotificationClientFactory";
import {NotificationChannelType} from "../../../src/Domain/NotificationChannel/NotificationChannelType";

export default class InMemoryNotificationClientFactory implements NotificationClientFactory {
    client: Record<string, NotificationChannelClient> = {}

    addClient(type: NotificationChannelType, client: NotificationChannelClient) {
        this.client[type.toString()] = client
    }

    createClient(notificationChannel: NotificationChannel): NotificationChannelClient {
        return this.client[notificationChannel.type.toString()];
    }
}
