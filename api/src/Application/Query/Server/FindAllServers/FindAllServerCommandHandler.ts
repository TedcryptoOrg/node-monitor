import { inject, injectable } from 'inversify'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import FindAllServerCommand from './FindAllServerCommand'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import ServerRepository, { FindAllCriteria } from '../../../../Domain/Server/ServerRepository'
import Server from '../../../../Domain/Server/Server'

@injectable()
export default class FindAllServerCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.ServerRepository) private readonly repository: ServerRepository
  ) {
  }

  async handle (command: FindAllServerCommand): Promise<Server[]> {
    const criteria: FindAllCriteria = {
      ...(command.configurationId !== undefined && { configuration_id: command.configurationId })
    }

    return await this.repository.findAll(criteria)
  }
}
