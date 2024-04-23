import { handleCommand } from '../handleCommandUtil'
import UpsertServerCommand from '../../../Application/Write/Server/UpsertServer/UpsertServerCommand'
import type Server from '../../../Domain/Server/Server'
import type { Request, Response } from 'express'
import { castToBoolean, castToNumber, castToNumberOrUndefined, castToString } from '../HttpUtil'

export const upsert = async (req: Request, resp: Response): Promise<void> => {
  const requiredFields = ['name', 'address', 'configuration_id', 'is_enabled']
  const missingFields = requiredFields.filter((field) => req.body[field] === undefined)
  if (missingFields.length > 0) {
    resp.status(400).send(`Missing fields: ${missingFields.join(', ')}`)
    throw new Error(`Missing fields: ${missingFields.join(', ')}`)
  }

  await handleCommand(
    new UpsertServerCommand(
      castToString(req.body.name),
      castToString(req.body.address),
      castToBoolean(req.body.is_enabled),
      castToNumber(req.body.configuration_id),
      castToNumberOrUndefined(req.params.id)
    ),
    resp,
    (server: Server) => resp.status(req.params.id !== undefined ? 200 : 202).send(server.toArray())
  )
}
