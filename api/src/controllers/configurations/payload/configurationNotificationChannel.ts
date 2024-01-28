import { Request } from 'express';
import {ConfigurationNotificationsInput} from "../../../database/models/configurationNotifications";

export function parse(req: Request): ConfigurationNotificationsInput {
    const requiredFields = ['configuration_id', 'notification_channel_id'];
    requiredFields.forEach((field) => {
        if (!req.body[field]) {
            throw new Error(`${field} can not be empty!`);
        }
    })

    return {
        configuration_id: req.body.configuration_id,
        notification_channel_id: req.body.notification_channel_id,
    };
}