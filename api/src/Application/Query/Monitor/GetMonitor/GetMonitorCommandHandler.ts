import CommandHandler from '../../../../Domain/Command/CommandHandler'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import GetMonitorCommand from './GetMonitorCommand'
import MonitorRepository from '../../../../Domain/Monitor/MonitorRepository'
import Monitor from '../../../../Domain/Monitor/Monitor'

@injectable()
export default class GetMonitorCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.MonitorRepository) private readonly repository: MonitorRepository
  ) {}

  async handle (command: GetMonitorCommand): Promise<Monitor> {
    return await this.repository.get(command.id)
  }
}
