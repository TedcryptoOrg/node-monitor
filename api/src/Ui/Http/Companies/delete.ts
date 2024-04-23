import { type RequestHandler, type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import DeleteCompanyCommand from '../../../Application/Write/Companies/DeleteCompany/DeleteCompanyCommand'

export const remove: RequestHandler = async (req: Request, resp: Response) => {
  await handleCommand(
    new DeleteCompanyCommand(Number(req.params.id)),
    resp,
    () => resp.status(200).send()
  )
}
