import type { Request, Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import GetNotificationChannelCommand from '../../../Application/Query/NotificationChannel/GetNotificationChannel/GetNotificationChannelCommand'
import type NotificationChannel from '../../../Domain/NotificationChannel/NotificationChannel'

export const getById = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new GetNotificationChannelCommand(Number(req.params.id)),
    resp,
    (notificationChannel: NotificationChannel) => {
      resp.send(notificationChannel.toArray())
    }
  )
}
