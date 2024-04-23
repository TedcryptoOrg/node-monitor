import { handleCommand } from '../handleCommandUtil'
import DeleteServiceCommand from '../../../Application/Write/Service/DeleteService/DeleteServiceCommand'
import type { Request, Response } from 'express'

export const deleteService = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new DeleteServiceCommand(Number(req.params.id)),
    resp,
    () => resp.status(200).send()
  )
}
