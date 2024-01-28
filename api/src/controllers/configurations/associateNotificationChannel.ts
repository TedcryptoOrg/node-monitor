import {Request, RequestHandler, Response} from "express";
import {parse} from "./payload/configurationNotificationChannel";
import * as configurationNotificationChannelDal from "../../database/dal/configurationNotificationChannels";

export const associateNotificationChannel: RequestHandler = async (req: Request, resp: Response) => {
    const configurationNotificationsInput = parse(req);
    const found = await configurationNotificationChannelDal.findByConfigurationIdAndNotificationChannelId(
        configurationNotificationsInput.configuration_id,
        configurationNotificationsInput.notification_channel_id
    );
    if (found) {
        return resp.status(400).send({message: 'This configuration is already associated with this notification channel.'});
    }

    const configurationNotificationChannel = await configurationNotificationChannelDal.create({
        configuration_id: configurationNotificationsInput.configuration_id,
        notification_channel_id: configurationNotificationsInput.notification_channel_id
    })

    return resp.send({configurationNotificationChannel});
}
