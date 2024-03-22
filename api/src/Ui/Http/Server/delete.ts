import {handleCommand} from "../handleCommandUtil";
import DeleteServerCommand from "../../../Application/Write/Server/DeleteServer/DeleteServerCommand";

export const deleteServer = async (req: any, resp: any) => {
    await handleCommand(
        new DeleteServerCommand(
            Number(req.params.id)
        ),
        resp,
        () => resp.status(200).send()
    )
}
