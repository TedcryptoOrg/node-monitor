import { handleCommand } from '../handleCommandUtil'
import DeleteNotificationChannelCommand from '../../../Application/Write/NotificationChannel/DeleteNotificationChannel/DeleteNotificationChannelCommand'
import type { Request, Response } from 'express'

export const deleteNotificationChannel = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new DeleteNotificationChannelCommand(Number(req.params.id)),
    resp,
    () => {
      resp.status(200).send()
    }
  )
}
