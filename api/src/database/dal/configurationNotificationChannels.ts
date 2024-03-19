import {ConfigurationNotifications, ConfigurationNotificationsInput} from "../models/configurationNotifications";
import * as AuditDal from "./audit";
import * as ConfigurationDal from "./configuration";
import * as NotificationChannelDal from "./notificationChannel";

export const findByConfigurationIdAndNotificationChannelId = async (configurationId: number, notificationChannelId: number) => {
    return ConfigurationNotifications.findOne({
        where: {
            configuration_id: configurationId,
            notification_channel_id: notificationChannelId
        }
    })
}


export const deleteById = async (id: number) => {
    const configurationNotification = await ConfigurationNotifications.findByPk(id)
    if (configurationNotification === null) {
        throw new Error(`Configuration notification with id ${id} not found`)
    }

    const configuration = await ConfigurationDal.get(configurationNotification.configuration_id)
    if (configuration === null) {
        throw new Error(`Configuration with id ${configurationNotification.configuration_id} not found`)
    }

    const notificationChannel = await NotificationChannelDal.get(configurationNotification.notification_channel_id)
    if (notificationChannel === null) {
        throw new Error(`Notification channel with id ${configurationNotification.notification_channel_id} not found`)
    }

    await AuditDal.create({
        monitor_id: null,
        server_id: null,
        configuration_id: configuration.id ?? null,
        message: `Channel ${notificationChannel.name} removed from configuration ${configuration.name}`,
        created_at: new Date(),
    })

    await configurationNotification.destroy()
}


export const findByConfigurationId = async (id: number) => {
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
