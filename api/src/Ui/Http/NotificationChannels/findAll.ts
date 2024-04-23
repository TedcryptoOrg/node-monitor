import { handleCommand } from '../handleCommandUtil'
import FindAllNotificationChannelsCommand from '../../../Application/Query/NotificationChannel/FindAllNotificationChannels/FindAllNotificationChannelsCommand'
import type NotificationChannel from '../../../Domain/NotificationChannel/NotificationChannel'
import { castToBooleanOrUndefined } from '../HttpUtil'
import type { Request, Response } from 'express'

export const findAll = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new FindAllNotificationChannelsCommand(castToBooleanOrUndefined(req.query.only_active) ?? undefined),
    resp,
    (notificationChannels: NotificationChannel[]) => {
      resp.status(200).send(
        notificationChannels.map(notificationChannel => notificationChannel.toArray())
      )
    }
  )
}
