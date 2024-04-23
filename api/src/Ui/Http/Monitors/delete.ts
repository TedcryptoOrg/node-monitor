import { handleCommand } from '../handleCommandUtil'
import DeleteMonitorCommand from '../../../Application/Write/Monitor/DeleteMonitor/DeleteMonitorCommand'
import type { Request, Response } from 'express'

export const deleteMonitor = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new DeleteMonitorCommand(parseInt(req.params.id)),
    resp,
    () => resp.status(204).send()
  )
}
