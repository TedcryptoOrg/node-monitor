import * as serverDal from "../../database/dal/server";
import {renderServers} from "../../views/servers";

export const findServers = async (req: any, resp: any) => {
    const servers = await serverDal.findByConfigurationId(req.params.id)

    resp.json(await renderServers(servers));
}
