import { handleCommand } from '../handleCommandUtil'
import DeleteNotificationChannelCommand from '../../../Application/Write/NotificationChannel/DeleteNotificationChannel/DeleteNotificationChannelCommand'

export const deleteNotificationChannel = async (req: any, resp: any) => {
  await handleCommand(
    new DeleteNotificationChannelCommand(Number(req.params.id)),
    resp,
    () => {
      resp.status(200).send()
    }
  )
}
