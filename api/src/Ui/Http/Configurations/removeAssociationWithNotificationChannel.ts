import { handleCommand } from '../handleCommandUtil'
import RemoveAssociationWithNotificationChannelCommand from '../../../Application/Write/Configuration/RemoveAssociationWithNotificationChannel/RemoveAssociationWithNotificationChannelCommand'
import type { Request, Response } from 'express'

export const removeAssociationWithNotificationChannel = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new RemoveAssociationWithNotificationChannelCommand(
      Number(req.params.notificationId)
    ),
    resp,
    () => resp.status(200).send({})
  )
}
