import { handleCommand } from '../handleCommandUtil'
import FindAllMonitorsCommand from '../../../Application/Query/Monitor/FindAllMonitors/FindAllMonitorsCommand'
import type Monitor from '../../../Domain/Monitor/Monitor'
import type { Request, Response } from 'express'

export const findAll = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new FindAllMonitorsCommand(),
    resp,
    (monitors: Monitor[]) => resp.status(200).send(
      monitors.map((monitor) => monitor.toArray())
    )
  )
}
