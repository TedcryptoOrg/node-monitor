import * as configurationDal from "../../database/dal/configuration";
import {renderNotificationChannels} from "../../views/notificationChannels";
import {NotificationChannel} from "../../database/models/notificationChannel";

export const findNotificationChannels = async (req: any, resp: any) => {
    const configuration = await configurationDal.get(req.params.id)
    const notificationChannels: NotificationChannel[] = [];
    for(const notificationChannel of await configuration?.getNotificationChannels() ?? []) {
        notificationChannels.push(await notificationChannel.getNotificationChannel())
    }

    resp.send(await renderNotificationChannels(notificationChannels ?? []))
}
