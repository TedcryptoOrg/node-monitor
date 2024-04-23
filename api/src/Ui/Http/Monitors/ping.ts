import { handleCommand } from '../handleCommandUtil'
import PingMonitorCommand from '../../../Application/Write/Monitor/PingMonitor/PingMonitorCommand'

export const ping = async (req: any, resp: any) => {
  const requiredFields = ['status']
  const missingFields = requiredFields.filter((field: string) => !(field in req.body))
  if (missingFields.length > 0) {
    return resp.status(400).send({
      message: `Missing required fields: ${missingFields.join(', ')}`
    })
  }

  await handleCommand(
    new PingMonitorCommand(
      Number(req.params.id),
      req.body.status === 'false' ? false : req.body.status, // TODO: cant make jest send false in boolean
      req.body.last_error ?? null
    ),
    resp,
    () => resp.status(202).send()
  )
}
