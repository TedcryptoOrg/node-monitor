import { handleCommand } from '../handleCommandUtil'
import DeleteMonitorCommand from '../../../Application/Write/Monitor/DeleteMonitor/DeleteMonitorCommand'

export const deleteMonitor = async (req: any, resp: any) => {
  await handleCommand(
    new DeleteMonitorCommand(parseInt(req.params.id)),
    resp,
    () => resp.status(204).send()
  )
}
