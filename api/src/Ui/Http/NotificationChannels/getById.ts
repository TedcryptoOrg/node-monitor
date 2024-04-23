import { type RequestHandler, type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import GetNotificationChannelCommand from '../../../Application/Query/NotificationChannel/GetNotificationChannel/GetNotificationChannelCommand'
import type NotificationChannel from '../../../Domain/NotificationChannel/NotificationChannel'

export const getById: RequestHandler = async (req: Request, resp: Response) => {
  await handleCommand(
    new GetNotificationChannelCommand(Number(req.params.id)),
    resp,
    (notificationChannel: NotificationChannel) => {
      resp.send(notificationChannel.toArray())
    }
  )
}
