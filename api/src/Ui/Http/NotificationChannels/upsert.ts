import { RequestHandler, Request, Response } from 'express';
import {handleCommand} from "../handleCommandUtil";
import UpsertNotificationChannelCommand from "../../../Application/Write/NotificationChannel/UpsertNotificationChannel/UpsertNotificationChannelCommand";

export const upsert: RequestHandler = async (req: Request, resp: Response) => {
    const requiredFields = ["name", "type", "configuration_object", "is_enabled"];
    const missingFields = requiredFields.filter((field) => !(field in req.body));

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
        new UpsertNotificationChannelCommand(
            req.body.name,
            req.body.type,
            configurationObject,
            req.body.is_enabled,
            req.params.id ? Number(req.params.id) : undefined
        ),
        resp,
        () => {
            resp.status(202).send({
                message: "Notification Channel created successfully!"
            })
        }
    )
}
