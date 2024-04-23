import Audit, { AuditArray } from '../../../Domain/Audit/Audit'
import AuditRepository from '../../../Domain/Audit/AuditRepository'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../Domain/DependencyInjection/types'
import { PrismaClient } from '@prisma/client'

@injectable()
export default class OrmAuditRepository implements AuditRepository {
  constructor (
    @inject(TYPES.OrmClient) private readonly ormClient: PrismaClient
  ) {
  }

  async create (audit: Audit): Promise<Audit> {
    return Audit.fromArray(await this.ormClient.audit.create({
      data: {
        message: audit.message,
        created_at: new Date(),
        configuration_id: audit.configuration !== null ? audit.configuration.id : undefined,
        monitor_id: audit.monitor !== null ? audit.monitor.id : undefined,
        server_id: audit.server !== null ? audit.server.id : undefined
      }
    }))
  }

  async findLatest (page: number, numRecords: number, limit: number): Promise<Audit[]> {
    const data = await this.ormClient.audit.findMany(
      {
        take: limit,
        skip: (page - 1) * numRecords,
        orderBy: {
          created_at: 'desc'
        }
      })

    return data.map((data: AuditArray) => Audit.fromArray(data))
  }
}
