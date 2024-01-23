import * as notificationDal from "../../database/dal/notificationChannel";
import {renderNotificationChannels} from "../../views/notificationChannels";

export const findAll = async (req: any, resp: any) => {
    const notificationChannels = await renderNotificationChannels(
        await notificationDal.getAll()
    );

    resp.send(notificationChannels)
}
