import {handleCommand} from "../handleCommandUtil";
import RemoveAssociationWithNotificationChannelCommand from "../../../Application/Write/Configuration/RemoveAssociationWithNotificationChannel/RemoveAssociationWithNotificationChannelCommand";

export const removeAssociationWithNotificationChannel = async (req: any, resp: any) => {
    await handleCommand(
        new RemoveAssociationWithNotificationChannelCommand(
            Number(req.params.id)
        ),
        resp,
        () => resp.status(200).send({})
    )
}
