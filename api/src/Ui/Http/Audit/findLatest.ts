import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import FindLatestCommand from '../../../Application/Query/Audit/FindLatest/FindLatestCommand'
import type Audit from '../../../Domain/Audit/Audit'
import { castToNumberOrUndefined } from '../HttpUtil'

export const findLatest = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new FindLatestCommand(
      castToNumberOrUndefined(req.body.page) ?? 1,
      castToNumberOrUndefined(req.body.numRecords) ?? 100,
      castToNumberOrUndefined(req.body.limit) ?? 100
    ),
    resp,
    async (audits: Audit[]) => resp.status(200).send(audits.map(audit => audit.toArray()))
  )
}
