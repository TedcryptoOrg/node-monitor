import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import UpsertNotificationChannelCommand from '../../../Application/Write/NotificationChannel/UpsertNotificationChannel/UpsertNotificationChannelCommand'
import { castToBoolean, castToNumberOrUndefined, castToString } from '../HttpUtil'
import { type NotificationChannelType } from '../../../Domain/NotificationChannel/NotificationChannelType'

export const upsert = async (req: Request, resp: Response): Promise<void> => {
  const requiredFields = ['name', 'type', 'configuration_object', 'is_enabled']
  const missingFields = requiredFields.filter((field) => !(field in req.body))

  if (missingFields.length > 0) {
    resp.status(400).send({
      message: `${missingFields.join(', ')} can not be empty!`
    })
    return
  }

  let configurationObject = req.body.configuration_object
  if (Array.isArray(configurationObject) || typeof configurationObject === 'object') {
    configurationObject = JSON.stringify(req.body.configuration_object)
  }

  await handleCommand(
    new UpsertNotificationChannelCommand(
      castToString(req.body.name),
      req.body.type as NotificationChannelType,
      castToString(configurationObject),
      castToBoolean(req.body.is_enabled),
      castToNumberOrUndefined(req.params.id)
    ),
    resp,
    () => {
      resp.status(202).send({
        message: 'Notification Channel created successfully!'
      })
    }
  )
}
