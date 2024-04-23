import { handleCommand } from '../handleCommandUtil'
import DeleteConfigurationCommand from '../../../Application/Write/Configuration/DeleteConfiguration/DeleteConfigurationCommand'
import type { Request, Response } from 'express'

export const deleteConfiguration = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new DeleteConfigurationCommand(Number(req.params.id)),
    resp,
    () => {
      resp.status(200).send()
    }
  )
}
