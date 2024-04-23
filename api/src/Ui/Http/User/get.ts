import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import GetUserCommand from '../../../Application/Query/User/GetUser/GetUserCommand'
import type User from '../../../Domain/User/User'

export const get = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new GetUserCommand(Number(req.params.id)),
    resp,
    (user: User) => {
      resp.status(200).send(user.toObject())
    }
  )
}
