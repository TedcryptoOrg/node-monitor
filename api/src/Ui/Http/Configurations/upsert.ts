import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import UpsertConfigurationCommand from '../../../Application/Write/Configuration/UpsertConfiguration/UpsertConfigurationCommand'
import type Configuration from '../../../Domain/Configuration/Configuration'
import { castToBoolean, castToNumberOrUndefined, castToString } from '../HttpUtil'

export const upsert = async (req: Request, resp: Response): Promise<void> => {
  const requiredFields = ['name', 'chain', 'is_enabled']
  const missingFields = requiredFields.filter(field => !(field in req.body))
  if (missingFields.length > 0) {
    resp.status(400).send(`Missing required fields: ${missingFields.join(', ')}`)
    return
  }

  await handleCommand(
    new UpsertConfigurationCommand(
      castToString(req.body.name),
      castToString(req.body.chain),
      castToBoolean(req.body.is_enabled),
      castToNumberOrUndefined(req.params.id)
    ),
    resp,
    (configuration: Configuration) => {
      resp.status(req.params.id !== undefined ? 200 : 202).send(configuration.toArray())
    }
  )
}
