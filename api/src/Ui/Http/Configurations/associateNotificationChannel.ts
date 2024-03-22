import {Request, RequestHandler, Response} from "express";
import {handleCommand} from "../handleCommandUtil";
import AssociateNotificationChannelCommand from "../../../Application/Write/Configuration/AssociateNotificationChannel/AssociateNotificationChannelCommand";
import ConfigurationNotification from "../../../Domain/Configuration/ConfigurationNotification";

export const associateNotificationChannel: RequestHandler = async (req: Request, resp: Response) => {
    const requiredFields = ['configuration_id', 'notification_channel_id'];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
        return resp.status(400).send({message: `${missingFields.join(', ')} can not be empty!`});
    }

    await handleCommand(
        new AssociateNotificationChannelCommand(
            Number(req.body.configuration_id),
            Number(req.body.notification_channel_id)
        ),
        resp,
        (configurationNotification: ConfigurationNotification) => resp.status(200).send(configurationNotification.toArray())
    )
}
