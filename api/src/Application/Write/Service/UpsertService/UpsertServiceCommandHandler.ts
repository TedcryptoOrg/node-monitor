import CommandHandler from '../../../../Domain/Command/CommandHandler'
import UpsertServiceCommand from './UpsertServiceCommand'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import AuditRepository from '../../../../Domain/Audit/AuditRepository'
import Audit from '../../../../Domain/Audit/Audit'
import ServiceRepository from '../../../../Domain/Service/ServiceRepository'
import Service from '../../../../Domain/Service/Service'
import ServerRepository from '../../../../Domain/Server/ServerRepository'

@injectable()
export default class UpsertServiceCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.ServiceRepository) private readonly serviceRepository: ServiceRepository,
    @inject(TYPES.ServerRepository) private readonly serverRepository: ServerRepository,
    @inject(TYPES.AuditRepository) private readonly auditRepository: AuditRepository
  ) {
  }

  async handle (command: UpsertServiceCommand): Promise<Service> {
    const server = await this.serverRepository.get(command.serverId)

    const service = await this.serviceRepository.upsert(new Service(
      command.name,
      command.address,
      command.isEnabled,
      command.type,
      server,
      command.id
    ))

    await this.auditRepository.create(new Audit(
      server.configuration ?? null,
      null,
      null,
      command.id
        ? `Service ${service.name} updated`
        : `Service ${service.name} created`
    ))

    return service
  }
}
