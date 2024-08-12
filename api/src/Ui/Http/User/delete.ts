import type { Request, Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import DeleteUserCommand from '../../../Application/Write/User/DeleteUser/DeleteUserCommand'

export const remove = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new DeleteUserCommand(Number(req.params.id)),
    resp,
    () => resp.status(200).send()
  )
}
