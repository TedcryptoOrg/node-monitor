import { handleCommand } from '../handleCommandUtil'
import FindAllServerCommand from '../../../Application/Query/Server/FindAllServers/FindAllServerCommand'
import type Server from '../../../Domain/Server/Server'

export const findServers = async (req: any, resp: any) => {
  await handleCommand(
    new FindAllServerCommand(Number(req.params.id)),
    resp,
    (servers: Server[]) => resp.send(servers.map(server => server.toArray()))
  )
}
