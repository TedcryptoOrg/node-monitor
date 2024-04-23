import Service from '../../../Domain/Service/Service'
import ServiceRepository, { FindAllCriteria } from '../../../Domain/Service/ServiceRepository'
import { inject, injectable } from 'inversify'
import { PrismaClient } from '@prisma/client'
import { TYPES } from '../../../Domain/DependencyInjection/types'
import RecordNotFound from '../../../Domain/RecordNotFound'

@injectable()
export default class OrmServiceRepository implements ServiceRepository {
  constructor (
    @inject(TYPES.OrmClient) private readonly ormClient: PrismaClient
  ) {
  }

  async get (id: number): Promise<Service> {
    const data = await this.ormClient.services.findUnique({
      where: {
        id
      },
      include: {
        server: true
      }
    })
    if (!data) {
      throw new RecordNotFound(`Service with id ${id} not found`)
    }

    return Service.fromArray(data)
  }

  async findAll (criteria?: FindAllCriteria | undefined): Promise<Service[]> {
    const data = await this.ormClient.services.findMany({
      where: {
        server_id: criteria?.server_id
      },
      include: {
        server: true
      }
    })

    return data.map(Service.fromArray)
  }

  async upsert (service: Service): Promise<Service> {
    if (!service.server) {
      throw new Error('Service must have a server')
    }

    const data = {
      name: service.name,
      server: { connect: { id: service.server.id } },
      address: service.address,
      is_enabled: service.isEnabled,
      type: service.type,
      updatedAt: new Date()
    }

    if (service.id) {
      return Service.fromArray(await this.ormClient.services.update({
        where: {
          id: service.id
        },
        data,
        include: {
          server: true
        }
      }))
    }

    return Service.fromArray(await this.ormClient.services.create({
      data: {
        ...data,
        createdAt: new Date()
      },
      include: {
        server: true
      }
    }))
  }

  async delete (id: number): Promise<void> {
    await this.ormClient.services.delete({
      where: {
        id
      }
    })
  }
}
