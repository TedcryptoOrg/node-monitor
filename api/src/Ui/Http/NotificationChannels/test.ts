import type { Request, Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import TestNotificationChannelCommand from '../../../Application/Write/NotificationChannel/TestNotificationChannel/TestNotificationChannelCommand'
import NotificationChannel from '../../../Domain/NotificationChannel/NotificationChannel'
import type { NotificationChannelType } from '../../../Domain/NotificationChannel/NotificationChannelType'
import { castToString } from '../HttpUtil'

export const test = async (req: Request, resp: Response): Promise<void> => {
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
    new TestNotificationChannelCommand(new NotificationChannel(
      castToString(req.body.name),
      req.body.type as NotificationChannelType,
      JSON.parse(configurationObject as string) as object,
      true
    )),
    resp,
    () => resp.status(200).send()
  )
}
