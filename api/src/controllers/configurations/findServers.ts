import * as serverDal from "../../database/dal/server";

export const findServers = async (req: any, resp: any) => {
    resp.json(await serverDal.findByConfigurationId(req.params.id));
}
