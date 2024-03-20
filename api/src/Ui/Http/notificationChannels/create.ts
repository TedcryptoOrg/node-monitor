import { RequestHandler, Request, Response } from 'express';
import * as notificationChannelDal from "../../database/dal/notificationChannel";
import {renderNotificationChannel} from "../../views/notificationChannels";
import {parse} from "./payload/notificationPayload";

export const create: RequestHandler = (req: Request, resp: Response) => {
    let payload = null;
    try {
        payload = parse(req)
    } catch (error: any) {
        resp.status(400).send({
            message: error.message
        });

        throw error;
    }

    notificationChannelDal.create({
        name: payload.name,
        type: payload.type,
        configuration_object: payload.configuration_object,
        is_enabled: payload.is_enabled ?? true
    }).then((notificationChannel) => {
        renderNotificationChannel(notificationChannel)
            .then((renderedNotificationChannel) => resp.status(202).send(renderedNotificationChannel));
    }).catch((err) => {
        resp.status(500).send({
            message:
                err.message || "Some error occurred while creating the Configuration."
        })
    })
}