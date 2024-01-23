import { RequestHandler, Request, Response } from 'express';
import * as notificationChannelDal from "../../database/dal/notificationChannel";
import {renderNotificationChannel} from "../../views/notificationChannels";

export const create: RequestHandler = (req: Request, resp: Response) => {
    const requiredFields = ["name", "type", "configuration_object"];
    requiredFields.forEach((field) => {
        if (!req.body[field]) {
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            throw new Error(`${field} can not be empty!`);
        }
    })
    // Check if configuration_object is an array or object and stringify it
    if (Array.isArray(req.body.configuration_object)) {
        req.body.configuration_object = JSON.stringify(req.body.configuration_object)
    } else if (typeof req.body.configuration_object === "object") {
        req.body.configuration_object = JSON.stringify(req.body.configuration_object)
    }

    notificationChannelDal.create({
        name: req.body.name,
        type: req.body.type,
        configuration_object: req.body.configuration_object,
        is_enabled: req.body.is_enabled ?? true
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