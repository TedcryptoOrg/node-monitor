import { type RequestHandler, type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import UpsertCompanyCommand from '../../../Application/Write/Companies/UpsertCompany/UpsertCompanyCommand'

export const upsert: RequestHandler = async (req: Request, resp: Response) => {
  if (req.method === 'PUT' && !req.params.id) {
    resp.status(400).send('ID is required for update')
    return
  }

  const requiredFields = ['name', 'is_active']
  const missingFields = []
  for (const field of requiredFields) {
    if (!req.body[field]) {
      missingFields.push(field)
    }
  }
  if (missingFields.length > 0) {
    resp.status(400).send(`Missing required fields: ${missingFields.join(', ')}`)
    return
  }

  await handleCommand(
    new UpsertCompanyCommand(
      req.params.id ? Number(req.params.id) : undefined,
      req.body.name,
      req.body.is_active
    ),
    resp,
    () => resp.status(req.method === 'PUT' ? 204 : 201).send()
  )
}
