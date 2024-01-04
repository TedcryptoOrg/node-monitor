import * as serviceDal from "../../database/dal/service";

export const findServices = async (req: any, resp: any): Promise<void> => {
    resp.send(await serviceDal.findByServerId(req.params.id))
}