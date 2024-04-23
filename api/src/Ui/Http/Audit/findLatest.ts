import { type Request, type RequestHandler, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import FindLatestCommand from '../../../Application/Query/Audit/FindLatest/FindLatestCommand'
import type Audit from '../../../Domain/Audit/Audit'

export const findLatest: RequestHandler = async (req: Request, resp: Response) => {
  await handleCommand(
    new FindLatestCommand(
      req.body.page ?? 1,
      req.body.numRecords ?? 100,
      req.body.limit ?? 100
    ),
    resp,
    async (audits: Audit[]) => resp.status(200).send(audits.map(audit => audit.toArray()))
  )
}
