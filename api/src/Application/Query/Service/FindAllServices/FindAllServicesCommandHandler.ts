import { inject, injectable } from 'inversify'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import FindAllServicesCommand from './FindAllServicesCommand'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import Service from '../../../../Domain/Service/Service'
import ServiceRepository, { FindAllCriteria } from '../../../../Domain/Service/ServiceRepository'

@injectable()
export default class FindAllServicesCommandHandler implements CommandHandler<FindAllServicesCommand> {
  constructor (
    @inject(TYPES.ServiceRepository) private readonly repository: ServiceRepository
  ) {
  }

  async handle (command: FindAllServicesCommand): Promise<Service[]> {
    const criteria: FindAllCriteria = {
      ...(command.serverId !== undefined && { server_id: command.serverId })
    }

    return await this.repository.findAll(criteria)
  }
}
