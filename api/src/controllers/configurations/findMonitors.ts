import * as monitorDal from "../../database/dal/monitor";

export const findMonitors = async (req: any, resp: any) => {
    resp.send(await monitorDal.findByConfigurationId(req.params.id))
}