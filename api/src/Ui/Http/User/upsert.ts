import type { Request, Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import UpsertUserCommand from '../../../Application/Write/User/UpsertUser/UpsertUserCommand'
import { castToBoolean, castToString, castToStringOrUndefined } from '../HttpUtil'

export const upsert = async (req: Request, resp: Response): Promise<void> => {
  if (req.method === 'PUT' && req.params.id === undefined) {
    resp.status(400).send('ID is required for update')
    return
  }

  const requiredFields = [
    'username',
    'company_id',
    'is_active',
    'is_admin',
    'is_super_admin',
    req.method === 'PUT' ? undefined : 'raw_password'
  ]
  const missingFields = []
  for (const field of requiredFields) {
    if (field !== undefined && !(field in req.body)) {
      missingFields.push(field)
    }
  }
  if (missingFields.length > 0) {
    console.error(`Missing required fields: ${missingFields.join(', ')}`)
    resp.status(400).send(`Missing required fields: ${missingFields.join(', ')}`)
    return
  }

  await handleCommand(
    new UpsertUserCommand(
      req.params.id !== undefined ? Number(req.params.id) : undefined,
      castToString(req.body.username),
      castToBoolean(req.body.is_active),
      castToBoolean(req.body.is_admin),
      castToBoolean(req.body.is_super_admin),
      req.body.company_id === undefined ? undefined : Number(req.body.company_id),
      castToStringOrUndefined(req.body.raw_password)
    ),
    resp,
    () => resp.status(req.method === 'PUT' ? 204 : 201).send()
  )
}
