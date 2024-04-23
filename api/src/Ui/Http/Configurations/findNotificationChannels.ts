import { handleCommand } from '../handleCommandUtil'
import FindConfigurationNotificationsCommand from '../../../Application/Query/Configuration/FindConfigurationNotifications/FindConfigurationNotificationsCommand'
import type ConfigurationNotification from '../../../Domain/Configuration/ConfigurationNotification'

export const findNotificationChannels = async (req: any, resp: any) => {
  await handleCommand(
    new FindConfigurationNotificationsCommand(Number(req.params.id)),
    resp,
    (configurationNotifications: ConfigurationNotification[]) =>
      resp.send(configurationNotifications.map(configurationNotification => configurationNotification.toArray()))
  )
}
