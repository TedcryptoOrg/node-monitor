import { handleCommand } from '../handleCommandUtil'
import FindAllServicesCommand from '../../../Application/Query/Service/FindAllServices/FindAllServicesCommand'
import type Service from '../../../Domain/Service/Service'
import type { Request, Response } from 'express'

export const findServices = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new FindAllServicesCommand(
      Number(req.params.id)
    ),
    resp,
    (services: Service[]) => resp.send(services.map((service: Service) => service.toArray()))
  )
}
