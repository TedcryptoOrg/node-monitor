import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import UpsertMonitorCommand from '../../../Application/Write/Monitor/UpsertMonitor/UpsertMonitorCommand'
import type Monitor from '../../../Domain/Monitor/Monitor'

export const upsert = async (req: Request, resp: Response): Promise<void> => {
  const requiredFields = ['name', 'type', 'configuration_id', 'configuration_object']
  const missingFields = requiredFields.filter((field) => req.body[field] === undefined)

  if (missingFields.length > 0) {
    resp.status(400).send(`Missing fields: ${missingFields.join(', ')}`)
  }

  // Check if configuration_object is an array or object and stringify it
  if (Array.isArray(req.body.configuration_object)) {
    req.body.configuration_object = JSON.stringify(req.body.configuration_object)
  } else if (typeof req.body.configuration_object === 'object') {
    req.body.configuration_object = JSON.stringify(req.body.configuration_object)
  }

  await handleCommand(
    new UpsertMonitorCommand(
      req.body.name,
      req.body.type,
      req.body.is_enabled,
      req.body.configuration_id,
      req.body.configuration_object,
      req.body.server_id,
      req.body.last_check,
      req.body.status,
      req.body.last_error,
      req.params.id ? parseInt(req.params.id) : undefined
    ),
    resp,
    (monitor: Monitor) => resp.status(req.params.id ? 200 : 202).send(monitor.toArray())
  )
}
