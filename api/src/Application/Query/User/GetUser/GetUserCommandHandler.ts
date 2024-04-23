import { inject, injectable } from 'inversify'
import GetUserCommand from './GetUserCommand'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import UserRepository from '../../../../Domain/User/UserRepository'
import User from '../../../../Domain/User/User'
import { TYPES } from '../../../../Domain/DependencyInjection/types'

@injectable()
export default class GetUserCommandHandler implements CommandHandler<GetUserCommand> {
  constructor (
    @inject(TYPES.UserRepository) private readonly repository: UserRepository
  ) {}

  async handle (command: GetUserCommand): Promise<User> {
    return await this.repository.get(command.id)
  }
}
