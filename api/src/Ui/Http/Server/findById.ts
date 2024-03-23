import GetServerCommand from "../../../Application/Query/Server/GetServer/GetServerCommand";
import Server from "../../../Domain/Server/Server";
import {handleCommand} from "../handleCommandUtil";

export const findById = async (req: any, resp: any): Promise<void> => {
    await handleCommand(
        new GetServerCommand(Number(req.params.id)),
        resp,
        (server: Server) => resp.status(200).send(server.toArray())
    );
}
