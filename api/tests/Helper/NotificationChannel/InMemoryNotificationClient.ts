import NotificationChannelClient from "../../../src/Domain/NotificationChannel/Client/NotificationChannelClient";

export default class InMemoryNotificationClient implements NotificationChannelClient {
    sentMessages: string[] = []

    getSentMessages(): string[] {
        return this.sentMessages
    }

    async send(message: string): Promise<void> {
        this.sentMessages.push(message);
    }
}