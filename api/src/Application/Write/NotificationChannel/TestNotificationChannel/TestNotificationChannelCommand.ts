import Command from "../../../../Domain/Command/Command";
import NotificationChannel from "../../../../Domain/NotificationChannel/NotificationChannel";

export default class TestNotificationChannelCommand implements Command {
    constructor(
        public readonly notificationChannel: NotificationChannel
    ) {
    }
}
