import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import GetCompanyCommand from '../../../Application/Query/Company/GetCompany/GetCompanyCommand'
import type Company from '../../../Domain/User/Company'

export const get = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new GetCompanyCommand(Number(req.params.id)),
    resp,
    (company: Company) => {
      resp.status(200).send(company.toObject())
    }
  )
}
