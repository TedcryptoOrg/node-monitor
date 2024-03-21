

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
