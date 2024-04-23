import { inject, injectable } from 'inversify'
import { PrismaClient } from '@prisma/client'
import { TYPES } from '../../../Domain/DependencyInjection/types'
import ConfigurationNotificationRepository from '../../../Domain/Configuration/ConfigurationNotificationRepository'
import ConfigurationNotification, {
  ConfigurationNotificationArray
} from '../../../Domain/Configuration/ConfigurationNotification'

@injectable()
export default class OrmConfigurationNotificationRepository implements ConfigurationNotificationRepository {
  constructor (
    @inject(TYPES.OrmClient) private readonly ormClient: PrismaClient
  ) {
  }

  async upsert (configurationNotification: ConfigurationNotification): Promise<ConfigurationNotification> {
    if (configurationNotification.configuration?.id === undefined || configurationNotification.notificationChannel?.id === undefined) {
      throw new Error('Configuration and NotificationChannel must have an id')
    }

    const data = {
      configuration: { connect: { id: configurationNotification.configuration.id } },
      notification_channel: { connect: { id: configurationNotification.notificationChannel.id } },
      updated_at: new Date()
    }
    if (configurationNotification.id !== undefined) {
      const obj = await this.ormClient.configuration_notification_channels.update({
        where: { id: configurationNotification.id },
        data,
        include: {
          configuration: true,
          notification_channel: true
        }
      })

      return ConfigurationNotification.fromArray(obj)
    }

    const obj = await this.ormClient.configuration_notification_channels.create({
      data: {
        ...data,
        created_at: new Date()
      },
      include: {
        configuration: true,
        notification_channel: true
      }
    })

    return ConfigurationNotification.fromArray(obj)
  }

  async delete (id: number): Promise<void> {
    await this.ormClient.configuration_notification_channels.delete({
      where: { id }
    })
  }

  async findByConfigurationId (configurationId: number): Promise<ConfigurationNotification[]> {
    const objs = await this.ormClient.configuration_notification_channels.findMany({
      where: {
        configuration_id: configurationId
      },
      include: {
        configuration: true,
        notification_channel: true
      }
    })

    return objs.map((configurationNotificationChannel: ConfigurationNotificationArray) => ConfigurationNotification.fromArray(configurationNotificationChannel))
  }
}
