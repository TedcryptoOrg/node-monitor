import { handleCommand } from '../handleCommandUtil'
import DeleteConfigurationCommand from '../../../Application/Write/Configuration/DeleteConfiguration/DeleteConfigurationCommand'

export const deleteConfiguration = async (req: any, resp: any) => {
  await handleCommand(
    new DeleteConfigurationCommand(Number(req.params.id)),
    resp,
    () => {
      resp.status(200).send()
    }
  )
}
