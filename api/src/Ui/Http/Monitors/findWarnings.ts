import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import FindWarningsCommand from '../../../Application/Query/Monitor/FindWarnings/FindWarningsCommand'
import type Monitor from '../../../Domain/Monitor/Monitor'

export const findWarnings = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new FindWarningsCommand(
      Number(req.query.limit ?? 100),
      Number(req.query.offset ?? 0)
    ),
    resp,
    (monitors: Monitor[]) => resp.status(200).send(
      monitors.map((monitor) => monitor.toArray())
    )
  )
}
