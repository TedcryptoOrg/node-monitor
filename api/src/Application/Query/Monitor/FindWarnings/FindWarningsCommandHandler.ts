import CommandHandler from '../../../../Domain/Command/CommandHandler'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import MonitorRepository from '../../../../Domain/Monitor/MonitorRepository'
import FindWarningsCommand from './FindWarningsCommand'
import Monitor from '../../../../Domain/Monitor/Monitor'

@injectable()
export default class FindWarningsCommandHandler implements CommandHandler<FindWarningsCommand> {
  constructor (
    @inject(TYPES.MonitorRepository) private readonly monitorRepository: MonitorRepository
  ) {
  }

  async handle (command: FindWarningsCommand): Promise<Monitor[]> {
    return await this.monitorRepository.findWarnings(command.limit, command.offset)
  }
}
