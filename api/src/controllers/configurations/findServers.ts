import * as serverDal from "../../database/dal/server";
import {renderServers} from "../../views/servers";

export const findServers = async (req: any, resp: any) => {
    resp.json(await renderServers(await serverDal.findByConfigurationId(req.params.id)));
}
