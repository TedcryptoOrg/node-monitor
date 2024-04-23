import { handleCommand } from '../handleCommandUtil'
import FindAllServerCommand from '../../../Application/Query/Server/FindAllServers/FindAllServerCommand'
import type Server from '../../../Domain/Server/Server'
import type { Request, Response } from 'express'

export const findAll = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new FindAllServerCommand(),
    resp,
    (servers: Server[]) => resp.status(200).send(servers.map(server => server.toArray()))
  )
}
