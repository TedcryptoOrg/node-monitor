import Command from '../../../../Domain/Command/Command'
import { inject, injectable } from 'inversify'
import DeleteUserCommand from './DeleteUserCommand'
import UserRepository from '../../../../Domain/User/UserRepository'
import { TYPES } from '../../../../Domain/DependencyInjection/types'

@injectable()
export default class DeleteUserCommandHandler implements Command {
  constructor (
    @inject(TYPES.UserRepository) private readonly userRepository: UserRepository
  ) {}

  async handle (command: DeleteUserCommand): Promise<void> {
    await this.userRepository.delete(command.id)
  }
}
