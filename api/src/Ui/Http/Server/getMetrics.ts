import { handleCommand } from '../handleCommandUtil'
import GetMetricsCommand from '../../../Application/Query/Server/GetMetrics/GetMetricsCommand'
import type { ServerMetrics } from '../../../Domain/Server/ServerMetrics'
import type { Request, Response } from 'express'
import { castToNumber } from '../HttpUtil'

export const getMetrics = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new GetMetricsCommand(
      castToNumber(req.params.id)
    ),
    resp,
    (metrics: ServerMetrics) => resp.status(200).send(metrics)
  )
}
