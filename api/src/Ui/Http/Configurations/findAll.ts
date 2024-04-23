import { handleCommand } from '../handleCommandUtil'
import FindAllConfigurationsCommand from '../../../Application/Query/Configuration/FindAllConfigurations/FindAllConfigurationsCommand'
import type Configuration from '../../../Domain/Configuration/Configuration'
import type { Request, Response } from 'express'

export const findAll = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new FindAllConfigurationsCommand(),
    resp,
    (configurations: Configuration[]) => {
      // TODO: for each configuration grab servers and monitors and notification_channels
      resp.send(configurations.map(configuration => configuration.toArray()))
    }
  )
}
