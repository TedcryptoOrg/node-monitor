import {handleCommand} from "../handleCommandUtil";
import FindAllServerCommand from "../../../Application/Query/Server/FindAllServers/FindAllServerCommand";
import Server from "../../../Domain/Server/Server";

export const findAll = async (req: any, resp: any) => {
    await handleCommand(
        new FindAllServerCommand(),
        resp,
        (servers: Server[]) => resp.status(200).send(servers.map(server => server.toArray()))
    );
}
