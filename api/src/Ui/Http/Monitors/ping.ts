import { handleCommand } from '../handleCommandUtil'
import PingMonitorCommand from '../../../Application/Write/Monitor/PingMonitor/PingMonitorCommand'
import type {Request, Response} from "express";
import {castToBoolean} from "../HttpUtil";

export const ping = async (req: Request, resp: Response): Promise<void> => {
  const requiredFields = ['status']
  const missingFields = requiredFields.filter((field: string) => !(field in req.body))
  if (missingFields.length > 0) {
    resp.status(400).send({
      message: `Missing required fields: ${missingFields.join(', ')}`
    })
  }

  await handleCommand(
    new PingMonitorCommand(
      Number(req.params.id),
      castToBoolean(req.body.status),
      req.body.last_error ?? null
    ),
    resp,
    () => resp.status(202).send()
  )
}
