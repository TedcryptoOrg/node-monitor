import CommandHandler from '../../../../Domain/Command/CommandHandler'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Domain/DependencyInjection/types'
import GetServerCommand from './GetServerCommand'
import ServerRepository from '../../../../Domain/Server/ServerRepository'
import Server from '../../../../Domain/Server/Server'

@injectable()
export default class GetServerCommandHandler implements CommandHandler<GetServerCommand> {
  constructor (
    @inject(TYPES.ServerRepository) private readonly repository: ServerRepository
  ) {}

  async handle (command: GetServerCommand): Promise<Server> {
    return await this.repository.get(command.id)
  }
}
