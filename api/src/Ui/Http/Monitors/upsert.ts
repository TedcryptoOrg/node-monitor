import type { Request, Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import UpsertMonitorCommand from '../../../Application/Write/Monitor/UpsertMonitor/UpsertMonitorCommand'
import type Monitor from '../../../Domain/Monitor/Monitor'
import {
  castToBoolean,
  castToBooleanOrUndefined,
  castToNumberOrUndefined,
  castToString,
  castToStringOrUndefined
} from '../HttpUtil'
import type { MonitorType } from '../../../Domain/Monitor/MonitorType'

export const upsert = async (req: Request, resp: Response): Promise<void> => {
  const requiredFields = ['name', 'type', 'configuration_id', 'configuration_object', 'is_enabled']
  const missingFields = requiredFields.filter((field) => req.body[field] === undefined)

  if (missingFields.length > 0) {
    resp.status(400).send(`Missing fields: ${missingFields.join(', ')}`)
    return
  }

  // Check if configuration_object is an array or object and stringify it
  if (Array.isArray(req.body.configuration_object)) {
    req.body.configuration_object = JSON.stringify(req.body.configuration_object)
  } else if (typeof req.body.configuration_object === 'object') {
    req.body.configuration_object = JSON.stringify(req.body.configuration_object)
  }

  await handleCommand(
    new UpsertMonitorCommand(
      castToString(req.body.name),
      req.body.type as MonitorType,
      castToBoolean(req.body.is_enabled),
      castToNumberOrUndefined(req.body.configuration_id),
      castToString(req.body.configuration_object),
      castToNumberOrUndefined(req.body.server_id),
      req.body.last_check !== undefined
        ? new Date(req.body.last_check as string)
        : undefined,
      castToBooleanOrUndefined(req.body.status),
      castToStringOrUndefined(req.body.last_error),
      castToNumberOrUndefined(req.params.id)
    ),
    resp,
    (monitor: Monitor) => resp.status(req.params.id !== undefined ? 200 : 202).send(monitor.toArray())
  )
}
