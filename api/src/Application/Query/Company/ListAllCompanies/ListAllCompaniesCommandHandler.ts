import CommandHandler from '../../../../Domain/Command/CommandHandler'
import ListAllCompaniesCommand from './ListAllCompaniesCommand'
import { inject, injectable } from 'inversify'
import Company from '../../../../Domain/User/Company'
import CompanyRepository from '../../../../Domain/User/CompanyRepository'
import { TYPES } from '../../../../Domain/DependencyInjection/types'

@injectable()
export default class ListAllCompaniesCommandHandler implements CommandHandler {
  constructor (
    @inject(TYPES.CompanyRepository) private readonly repository: CompanyRepository
  ) {}

  async handle (command: ListAllCompaniesCommand): Promise<Company[]> {
    return await this.repository.findAll()
  }
}
