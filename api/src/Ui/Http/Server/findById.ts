import GetServerCommand from '../../../Application/Query/Server/GetServer/GetServerCommand'
import type Server from '../../../Domain/Server/Server'
import { handleCommand } from '../handleCommandUtil'
import type { Request, Response } from 'express'

export const findById = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new GetServerCommand(Number(req.params.id)),
    resp,
    (server: Server) => resp.status(200).send(server.toArray())
  )
}
