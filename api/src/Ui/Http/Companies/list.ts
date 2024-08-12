import type { Request, Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import ListAllCompaniesCommand from '../../../Application/Query/Company/ListAllCompanies/ListAllCompaniesCommand'
import type Company from '../../../Domain/User/Company'

export const list = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new ListAllCompaniesCommand(),
    resp,
    (distributeChains: Company[]) => resp.status(200).send({
      results: distributeChains.map((company: Company) => company.toObject())
    })
  )
}
