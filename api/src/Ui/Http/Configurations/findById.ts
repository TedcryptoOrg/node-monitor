import { handleCommand } from '../handleCommandUtil'
import GetConfigurationCommand from '../../../Application/Query/Configuration/GetConfiguration/GetConfigurationCommand'
import type Configuration from '../../../Domain/Configuration/Configuration'
import type { Request, Response } from 'express'

export const findById = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new GetConfigurationCommand(Number(req.params.id)),
    resp,
    (configuration: Configuration) => {
      resp.send(configuration.toArray())
    }
  )
}
