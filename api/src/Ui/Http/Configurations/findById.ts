import { handleCommand } from '../handleCommandUtil'
import GetConfigurationCommand from '../../../Application/Query/Configuration/GetConfiguration/GetConfigurationCommand'
import type Configuration from '../../../Domain/Configuration/Configuration'

export const findById = async (req: any, resp: any) => {
  await handleCommand(
    new GetConfigurationCommand(Number(req.params.id)),
    resp,
    (configuration: Configuration) => {
      resp.send(configuration.toArray())
    }
  )
}
