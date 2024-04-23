import { handleCommand } from '../handleCommandUtil'
import GetMonitorCommand from '../../../Application/Query/Monitor/GetMonitor/GetMonitorCommand'
import type Monitor from '../../../Domain/Monitor/Monitor'
import type { Request, Response } from 'express'

export const findById = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new GetMonitorCommand(Number(req.params.id)),
    resp,
    (monitor: Monitor) => resp.status(200).send(monitor.toArray())
  )
}
