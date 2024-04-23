import { inject, injectable } from 'inversify'
import UpsertUserCommand from './UpsertUserCommand'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import UserRepository from '../../../../Domain/User/UserRepository'
import User from '../../../../Domain/User/User'
import CompanyRepository from '../../../../Domain/User/CompanyRepository'
import { TYPES } from '../../../../Domain/DependencyInjection/types'

@injectable()
export default class UpsertUserCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.UserRepository) private readonly repository: UserRepository,
    @inject(TYPES.CompanyRepository) private readonly companyRepository: CompanyRepository
  ) {}

  async handle (command: UpsertUserCommand): Promise<void> {
    await this.repository.upsert(
      new User(
        command.username,
        command.isActive,
        command.isAdmin,
        command.isSuperAdmin,
        command.companyId !== undefined
          ? await this.companyRepository.get(command.companyId)
          : undefined,
        undefined,
        command.rawPassword,
        command.id
      )
    )
  }
}
