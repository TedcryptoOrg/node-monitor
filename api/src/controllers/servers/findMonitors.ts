import * as monitorDal from "../../database/dal/monitor";

export const findMonitors = async (req: any, resp: any): Promise<void> => {
    resp.send(await monitorDal.findByServerId(req.params.id))
}