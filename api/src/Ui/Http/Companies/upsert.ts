import type { Request, Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import UpsertCompanyCommand from '../../../Application/Write/Companies/UpsertCompany/UpsertCompanyCommand'
import { castToBoolean, castToNumberOrUndefined, castToString } from '../HttpUtil'

export const upsert = async (req: Request, resp: Response): Promise<void> => {
  if (req.method === 'PUT' && req.params.id === undefined) {
    resp.status(400).send('ID is required for update')
    return
  }

  const requiredFields = ['name', 'is_active']
  const missingFields = []
  for (const field of requiredFields) {
    if (!(field in req.body)) {
      missingFields.push(field)
    }
  }
  if (missingFields.length > 0) {
    resp.status(400).send(`Missing required fields: ${missingFields.join(', ')}`)
    return
  }

  await handleCommand(
    new UpsertCompanyCommand(
      castToNumberOrUndefined(req.params.id),
      castToString(req.body.name),
      castToBoolean(req.body.is_active)
    ),
    resp,
    () => resp.status(req.method === 'PUT' ? 204 : 201).send()
  )
}
