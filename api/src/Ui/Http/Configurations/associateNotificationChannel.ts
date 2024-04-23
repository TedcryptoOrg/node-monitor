import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import AssociateNotificationChannelCommand from '../../../Application/Write/Configuration/AssociateNotificationChannel/AssociateNotificationChannelCommand'
import type ConfigurationNotification from '../../../Domain/Configuration/ConfigurationNotification'

export const associateNotificationChannel = async (req: Request, resp: Response): Promise<void> => {
  const requiredFields = ['configuration_id', 'notification_channel_id']
  const missingFields = requiredFields.filter((field) => !(field in req.body))
  if (missingFields.length > 0) {
    resp.status(400).send({ message: `${missingFields.join(', ')} can not be empty!` })
    return
  }

  await handleCommand(
    new AssociateNotificationChannelCommand(
      Number(req.body.configuration_id),
      Number(req.body.notification_channel_id)
    ),
    resp,
    (configurationNotification: ConfigurationNotification) => resp.status(200).send(configurationNotification.toArray())
  )
}
