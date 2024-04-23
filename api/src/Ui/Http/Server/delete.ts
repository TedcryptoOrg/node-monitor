import { handleCommand } from '../handleCommandUtil'
import DeleteServerCommand from '../../../Application/Write/Server/DeleteServer/DeleteServerCommand'
import type { Request, Response } from 'express'

export const deleteServer = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new DeleteServerCommand(
      Number(req.params.id)
    ),
    resp,
    () => resp.status(200).send()
  )
}
