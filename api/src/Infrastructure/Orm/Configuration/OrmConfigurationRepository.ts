import { inject, injectable } from 'inversify'
import { PrismaClient } from '@prisma/client'
import { TYPES } from '../../../Domain/DependencyInjection/types'
import ConfigurationRepository from '../../../Domain/Configuration/ConfigurationRepository'
import Configuration, { ConfigurationArray } from '../../../Domain/Configuration/Configuration'

@injectable()
export default class OrmConfigurationRepository implements ConfigurationRepository {
  constructor (
    @inject(TYPES.OrmClient) private readonly ormClient: PrismaClient
  ) {
  }

  async get (id: number): Promise<Configuration> {
    return Configuration.fromArray(await this.ormClient.configurations.findUnique({
      where: { id },
      include: {
        monitors: true,
        servers: true,
        notification_channels: true
      }
    }) as ConfigurationArray)
  }

  async findAll (): Promise<Configuration[]> {
    const results = await this.ormClient.configurations.findMany({
      include: {
        monitors: true,
        servers: true,
        notification_channels: true
      }
    })

    return results.map((configuration: any) => Configuration.fromArray(configuration as ConfigurationArray))
  }

  async upsert (configuration: Configuration): Promise<Configuration> {
    const data = {
      name: configuration.name,
      chain: configuration.chain,
      is_enabled: configuration.is_enabled
    }

    if (configuration.id !== undefined) {
      return Configuration.fromArray(
        await this.ormClient.configurations.update({
          where: { id: configuration.id },
          data,
          include: {
            monitors: true,
            servers: true,
            notification_channels: true
          }
        })
      )
    }

    return Configuration.fromArray(
      await this.ormClient.configurations.create({
        data: {
          ...data,
          ...{ createdAt: new Date(), updatedAt: new Date() }
        },
        include: {
          monitors: true,
          servers: true,
          notification_channels: true
        }
      })
    )
  }

  async delete (id: number): Promise<void> {
    await this.ormClient.configurations.delete({
      where: { id }
    })
  }
}
