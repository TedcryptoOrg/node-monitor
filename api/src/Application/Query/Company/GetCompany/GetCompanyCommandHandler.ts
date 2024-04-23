import { inject, injectable } from 'inversify'
import GetCompanyCommand from './GetCompanyCommand'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import CompanyRepository from '../../../../Domain/User/CompanyRepository'
import Company from '../../../../Domain/User/Company'
import { TYPES } from '../../../../Domain/DependencyInjection/types'

@injectable()
export default class GetCompanyCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.CompanyRepository) private readonly repository: CompanyRepository
  ) {}

  async handle (command: GetCompanyCommand): Promise<Company> {
    return await this.repository.get(command.id)
  }
}
