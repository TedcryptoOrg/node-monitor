import { Request } from 'express';
import {NotificationChannelInput} from "../../../database/models/notificationChannel";

export function parse(req: Request): NotificationChannelInput {
    const requiredFields = ["name", "type", "configuration_object"];
    requiredFields.forEach((field) => {
        if (!req.body[field]) {
            throw new Error(`${field} can not be empty!`);
        }
    })

    let configurationObject = req.body.configuration_object;
    if (Array.isArray(configurationObject) || typeof configurationObject === "object") {
        configurationObject = JSON.stringify(req.body.configuration_object)
    }

    return {
        name: req.body.name,
        type: req.body.type,
        configuration_object: configurationObject,
        is_enabled: req.body.is_enabled ?? true,
    };
}