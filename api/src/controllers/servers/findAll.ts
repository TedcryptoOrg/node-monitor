import * as serverDal from "../../database/dal/server";
import {renderServers} from "../../views/servers";

export const findAll = async (req: any, resp: any) => {
    const servers = await serverDal.getAll();

    resp.send(await renderServers(servers, true))
}
