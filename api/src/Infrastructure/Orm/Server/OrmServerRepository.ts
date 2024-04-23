import Server, { ServerArray } from '../../../Domain/Server/Server'
import ServerRepository, { FindAllCriteria } from '../../../Domain/Server/ServerRepository'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../Domain/DependencyInjection/types'
import { PrismaClient } from '@prisma/client'
import RecordNotFound from '../../../Domain/RecordNotFound'

@injectable()
export default class OrmServerRepository implements ServerRepository {
  constructor (
    @inject(TYPES.OrmClient) private readonly ormClient: PrismaClient
  ) {
  }

  async get (id: number): Promise<Server> {
    const data = await this.ormClient.servers.findUnique({
      where: {
        id
      },
      include: {
        configuration: true,
        services: true
      }
    })
    if (data === undefined || data === null) {
      throw new RecordNotFound(`Server with id ${id} not found`)
    }

    return Server.fromArray(data)
  }

  async upsert (server: Server): Promise<Server> {
    const data = {
      name: server.name,
      address: server.address,
      is_enabled: server.isEnabled,
      updatedAt: new Date(),
      ...(server.configuration?.id !== undefined ? { configuration: { connect: { id: server.configuration.id } } } : {})
    }
    if (server.id !== undefined) {
      return Server.fromArray(await this.ormClient.servers.update({
        where: {
          id: server.id
        },
        data,
        include: {
          configuration: true,
          services: true
        }
      }))
    }
    if (server.configuration?.id === undefined) {
      throw new Error('Configuration is required')
    }

    const result = await this.ormClient.servers.create({
      data: {
        ...data,
        configuration: { connect: { id: server.configuration.id } },
        createdAt: new Date()
      },
      include: {
        configuration: true,
        services: true
      }
    })

    return Server.fromArray(result)
  }

  async delete (id: number): Promise<void> {
    await this.ormClient.servers.delete({
      where: {
        id
      }
    })
  }

  async findAll (criteria?: FindAllCriteria): Promise<Server[]> {
    const data = await this.ormClient.servers.findMany({
      where: criteria,
      include: {
        configuration: true,
        services: true
      }
    })

    return data.map((server: ServerArray) => Server.fromArray(server))
  }
}
