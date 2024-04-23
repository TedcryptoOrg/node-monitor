import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import type Monitor from '../../../Domain/Monitor/Monitor'
import FindFailedCommand from '../../../Application/Query/Monitor/FindFailed/FindFailedCommand'

export const findFailed = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new FindFailedCommand(
      Number(req.query.limit ?? 100),
      Number(req.query.offset ?? 0)
    ),
    resp,
    (monitors: Monitor[]) => resp.status(200).send(
      monitors.map((monitor) => monitor.toArray())
    )
  )
}
