import {handleCommand} from "../handleCommandUtil";
import FindAllNotificationChannelsCommand from "../../../Application/Query/NotificationChannel/FindAllNotificationChannels/FindAllNotificationChannelsCommand";
import NotificationChannel from "../../../Domain/NotificationChannel/NotificationChannel";
import {convertBoolean} from "../HttpUtil";

export const findAll = async (req: any, resp: any) => {
    await handleCommand(
        new FindAllNotificationChannelsCommand(convertBoolean(req.query.only_active) ?? undefined),
        resp,
        (notificationChannels: NotificationChannel[]) => {
            resp.status(200).send(notificationChannels.map((notificationChannel) => {
                return notificationChannel.toArray()
            }))
        }
    )
}
