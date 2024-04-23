import { handleCommand } from '../handleCommandUtil'
import FindAllServerCommand from '../../../Application/Query/Server/FindAllServers/FindAllServerCommand'
import type Server from '../../../Domain/Server/Server'
import type { Request, Response } from 'express'

export const findServers = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new FindAllServerCommand(Number(req.params.id)),
    resp,
    (servers: Server[]) => resp.send(servers.map(server => server.toArray()))
  )
}
