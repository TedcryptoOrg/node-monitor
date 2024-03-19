import {NotificationChannel, NotificationChannelInput, NotificationChannelOutput} from "../models/notificationChannel";
import * as AuditDal from "./audit";
import {RecordNotFound} from "../../exceptions/recordNotFound";

export function update(id: number, notificationChannel: NotificationChannelInput) {
    return NotificationChannel.update(notificationChannel, {
        where: {
            id: id
        }
    })
}

/**
 * @throws RecordNotFound
 */
export const deleteNotificationChannel = async(id: number): Promise<void> => {
    const notificationChannel = await NotificationChannel.findByPk(id)
    if (notificationChannel === null) {
        throw new RecordNotFound(`Notification channel "${id}" not found`)
    }

    await AuditDal.create({
        message: `Notification channel ${notificationChannel.name} created`,
        created_at: new Date(),
    })

    await NotificationChannel.destroy({
        where: {
            id: id
        }
    })
}

export const get = async(id: number): Promise<NotificationChannelOutput> => {
    const notificationChannel = await NotificationChannel.findByPk(id)
    if (notificationChannel === null) {
        throw new RecordNotFound(`Notification channel "${id}" not found`)
    }

    return notificationChannel
}

export const create = async(notificationChannel: NotificationChannelInput): Promise<NotificationChannelOutput> => {
    notificationChannel.created_at = new Date()
    notificationChannel.updated_at = new Date()

    await AuditDal.create({
        message: `Notification channel ${notificationChannel.name} created`,
        created_at: new Date(),
    })

    return await NotificationChannel.create(notificationChannel)
}

export const getAll = async (): Promise<NotificationChannelOutput[]> => {
    return await NotificationChannel.findAll()
}

export const getAllActive = async (): Promise<NotificationChannelOutput[]> => {
    return await NotificationChannel.findAll({
        where: {
            is_enabled: true,
        }
    })
}
