import { inject, injectable } from 'inversify'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import FindAllMonitorsCommand from './FindAllMonitorsCommand'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import MonitorRepository from '../../../../Domain/Monitor/MonitorRepository'
import Monitor from '../../../../Domain/Monitor/Monitor'

@injectable()
export default class FindAllMonitorsCommandHandler implements CommandHandler<FindAllMonitorsCommand> {
  constructor (
    @inject(TYPES.MonitorRepository) private readonly repository: MonitorRepository
  ) {
  }

  async handle (command: FindAllMonitorsCommand): Promise<Monitor[]> {
    const criteria = {
      ...(command.configurationId !== undefined && { configuration_id: command.configurationId }),
      ...(command.serverId !== undefined && { server_id: command.serverId })
    }

    return await this.repository.findAll(criteria)
  }
}
