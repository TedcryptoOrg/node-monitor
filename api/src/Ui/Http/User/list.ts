import type { Request, Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import type User from '../../../Domain/User/User'
import ListAllUsersCommand from '../../../Application/Query/User/ListAllUser/ListAllUsersCommand'

export const list = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new ListAllUsersCommand(),
    resp,
    (users: User[]) => {
      resp.status(200).send({
        results: users.map((user: User) => user.toObject())
      })
    }
  )
}
