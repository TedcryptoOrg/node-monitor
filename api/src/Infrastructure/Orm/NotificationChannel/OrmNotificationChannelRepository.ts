import NotificationChannelRepository from '../../../Domain/NotificationChannel/NotificationChannelRepository'
import NotificationChannel, { NotificationChannelArray } from '../../../Domain/NotificationChannel/NotificationChannel'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../Domain/DependencyInjection/types'
import { PrismaClient } from '@prisma/client'

@injectable()
export default class OrmNotificationChannelRepository implements NotificationChannelRepository {
  constructor (
    @inject(TYPES.OrmClient) private readonly ormClient: PrismaClient
  ) {
  }

  async get (id: number): Promise<NotificationChannel> {
    const notificationChannel = await this.ormClient.notification_channels.findUnique({
      where: {
        id
      }
    })

    if (notificationChannel === null || notificationChannel === undefined) {
      throw new Error('NotificationChannel not found')
    }

    return NotificationChannel.fromArray(notificationChannel as NotificationChannelArray)
  }

  async findAll (isEnabled?: boolean): Promise<NotificationChannel[]> {
    const notificationChannels = await this.ormClient.notification_channels.findMany({
      where: {
        is_enabled: isEnabled
      }
    })

    return notificationChannels.map(
      (notificationChannel: any) => NotificationChannel.fromArray(notificationChannel as NotificationChannelArray)
    )
  }

  async upsert (notificationChannel: NotificationChannel): Promise<NotificationChannel> {
    const data = {
      name: notificationChannel.name,
      type: notificationChannel.type,
      is_enabled: notificationChannel.isEnabled,
      configuration_object: notificationChannel.toArray().configuration_object,
      updated_at: new Date()
    }
    if (notificationChannel.id) {
      return NotificationChannel.fromArray(
        await this.ormClient.notification_channels.update({
          where: { id: notificationChannel.id },
          data
        })
      )
    }

    return NotificationChannel.fromArray(await this.ormClient.notification_channels.create({
      data
    }))
  }

  async delete (id: number): Promise<void> {
    await this.ormClient.notification_channels.delete({
      where: {
        id
      }
    })
  }
}
