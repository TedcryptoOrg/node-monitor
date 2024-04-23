import { handleCommand } from '../handleCommandUtil'
import FindAllMonitorsCommand from '../../../Application/Query/Monitor/FindAllMonitors/FindAllMonitorsCommand'
import type Monitor from '../../../Domain/Monitor/Monitor'
import type { Request, Response } from 'express'

export const findMonitors = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new FindAllMonitorsCommand(
      undefined,
      Number(req.params.id)
    ),
    resp,
    (monitors: Monitor[]) => resp.send(monitors.map((monitor: Monitor) => monitor.toArray()))
  )
}
