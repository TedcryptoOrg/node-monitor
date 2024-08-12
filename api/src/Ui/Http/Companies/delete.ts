import type { Request, Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import DeleteCompanyCommand from '../../../Application/Write/Companies/DeleteCompany/DeleteCompanyCommand'

export const remove = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new DeleteCompanyCommand(Number(req.params.id)),
    resp,
    () => resp.status(200).send()
  )
}
