import * as configurationDal from "../../database/dal/configuration";
import {renderNotificationChannels} from "../../views/notificationChannels";
import {renderConfiguration} from "../../views/configuration";

export const findNotificationChannels = async (req: any, resp: any) => {
    const configuration = await configurationDal.get(req.params.id)
    if (configuration === null) {
        resp.status(404).send(`Configuration with id ${req.params.id} not found`)
        return
    }

    const configurationView = await renderConfiguration(configuration, false, false)

    resp.send(await renderNotificationChannels(configurationView.notification_channels))
}
