import { RequestHandler, Request, Response } from 'express';
import {handleCommand} from "../handleCommandUtil";
import GetNotificationChannelCommand from "../../../Application/Query/NotificationChannel/GetNotificationChannel/GetNotificationChannelCommand";
import NotificationChannel from "../../../Domain/NotificationChannel/NotificationChannel";

export const upsert: RequestHandler = async (req: Request, resp: Response) => {
    await handleCommand(
        new GetNotificationChannelCommand(
            Number(req.params.id)
        ),
        resp,
        (notificationChannel: NotificationChannel) => {
            resp.status(200).send(notificationChannel.toArray())
        }
    )
}
