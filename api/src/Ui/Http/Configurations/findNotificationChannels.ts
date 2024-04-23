import { handleCommand } from '../handleCommandUtil'
import FindConfigurationNotificationsCommand from '../../../Application/Query/Configuration/FindConfigurationNotifications/FindConfigurationNotificationsCommand'
import type ConfigurationNotification from '../../../Domain/Configuration/ConfigurationNotification'
import type { Request, Response } from 'express'

export const findNotificationChannels = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new FindConfigurationNotificationsCommand(Number(req.params.id)),
    resp,
    (configurationNotifications: ConfigurationNotification[]) =>
      resp.send(configurationNotifications.map(configurationNotification => configurationNotification.toArray()))
  )
}
