import {handleCommand} from "../handleCommandUtil";
import DeleteServiceCommand from "../../../Application/Write/Service/DeleteService/DeleteServiceCommand";

export const deleteService = async (req: any, resp: any) => {
    await handleCommand(
        new DeleteServiceCommand(Number(req.params.id)),
        resp,
        () => resp.status(200).send()
    )
}
