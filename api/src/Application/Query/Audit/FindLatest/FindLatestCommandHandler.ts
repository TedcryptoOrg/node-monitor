import CommandHandler from '../../../../Domain/Command/CommandHandler'
import FindLatestCommand from './FindLatestCommand'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import AuditRepository from '../../../../Domain/Audit/AuditRepository'

@injectable()
export default class FindLatestCommandHandler implements CommandHandler<FindLatestCommand> {
  constructor (
    @inject(TYPES.AuditRepository) private readonly auditRepository: AuditRepository
  ) {}

  async handle (command: FindLatestCommand): Promise<any> {
    return await this.auditRepository.findLatest(command.page, command.numRecords, command.limit)
  }
}
