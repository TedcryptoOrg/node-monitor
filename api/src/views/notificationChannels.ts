import {NotificationChannel, NotificationChannelOutput} from "../database/models/notificationChannel";

export async function renderNotificationChannels(notificationChannels: NotificationChannel[]|NotificationChannelOutput[]) {
    const result = [];
    for (const notificationChannel of notificationChannels) {
        result.push(await renderNotificationChannel(notificationChannel))
    }

    return result;
}

export async function renderNotificationChannel(notificationChannel: NotificationChannel|NotificationChannelOutput): Promise<any> {
    return {
        id: notificationChannel.id,
        name: notificationChannel.name,
        type: notificationChannel.type,
        configuration_object: JSON.parse(notificationChannel.configuration_object),
        is_enabled: notificationChannel.is_enabled,
        created_at: notificationChannel.created_at,
        updated_at: notificationChannel.updated_at,
    };
}