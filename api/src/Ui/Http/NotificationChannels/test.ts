import { RequestHandler, Request, Response } from 'express';
import {handleCommand} from "../handleCommandUtil";
import TestNotificationChannelCommand from "../../../Application/Write/NotificationChannel/TestNotificationChannel/TestNotificationChannelCommand";
import NotificationChannel from "../../../Domain/NotificationChannel/NotificationChannel";
import {NotificationChannelType} from "../../../Domain/NotificationChannel/NotificationChannelType";

export const test: RequestHandler = async (req: Request, resp: Response) => {
    const requiredFields = ["name", "type", "configuration_object", "is_enabled"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
        resp.status(400).send({
            message: `${missingFields.join(", ")} can not be empty!`
        });
        return;
    }

    let configurationObject = req.body.configuration_object;
    if (Array.isArray(configurationObject) || typeof configurationObject === "object") {
        configurationObject = JSON.stringify(req.body.configuration_object)
    }

    await handleCommand(
        new TestNotificationChannelCommand(new NotificationChannel(
            req.body.name,
            req.body.type as NotificationChannelType,
            configurationObject,
            true
        )),
        resp,
        () => resp.status(200).send()
    )
}