import {ConfigurationNotifications, ConfigurationNotificationsInput} from "../models/configurationNotifications";
import * as AuditDal from "./audit";
import * as ConfigurationDal from "./configuration";
import * as NotificationChannelDal from "./notificationChannel";

export async function findByConfigurationId(id: number) {
    return await ConfigurationNotifications.findAll({
        where: {
            configuration_id: id
        }
    })
}

export async function create(configurationNotifications: ConfigurationNotificationsInput) {
    const configuration = await ConfigurationDal.get(configurationNotifications.configuration_id)
    if (configuration === null) {
        throw new Error(`Configuration with id ${configurationNotifications.configuration_id} not found`)
    }
    const notificationChannel = await NotificationChannelDal.get(configurationNotifications.notification_channel_id)
    if (notificationChannel === null) {
        throw new Error(`Notification channel with id ${configurationNotifications.notification_channel_id} not found`)
    }

    await AuditDal.create({
        monitor_id: null,
        server_id: null,
        configuration_id: configuration.id ?? null,
        message: `Channel ${notificationChannel.name} associated with configuration ${configuration.name}`,
        created_at: new Date(),
    })

    return await ConfigurationNotifications.create({
        configuration_id: configurationNotifications.configuration_id,
        notification_channel_id: configurationNotifications.notification_channel_id,
        created_at: new Date(),
        updated_at: new Date(),
    })
}
