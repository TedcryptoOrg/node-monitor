import type { Request, Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import UpsertServiceCommand from '../../../Application/Write/Service/UpsertService/UpsertServiceCommand'
import type Service from '../../../Domain/Service/Service'
import type { ServiceType } from '../../../Domain/Service/ServiceType'
import { castToBoolean, castToNumber, castToNumberOrUndefined, castToString } from '../HttpUtil'

export const upsert = async (req: Request, resp: Response): Promise<void> => {
  const requiredFields = ['name', 'address', 'server_id', 'type', 'is_enabled']
  const missingFields = requiredFields.filter((field) => req.body[field] === undefined)
  if (missingFields.length > 0) {
    resp.status(400).send({
      message: `Missing required fields: ${missingFields.join(', ')}`
    })
    return
  }

  await handleCommand(
    new UpsertServiceCommand(
      castToNumber(req.body.server_id),
      castToString(req.body.name),
      castToString(req.body.address),
      castToBoolean(req.body.is_enabled),
      req.body.type as ServiceType,
      castToNumberOrUndefined(req.params.id)
    ),
    resp,
    (service: Service) => resp.status(req.params.id !== undefined ? 200 : 202).send(service.toArray())
  )
}
