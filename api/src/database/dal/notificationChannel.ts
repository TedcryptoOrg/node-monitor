

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
