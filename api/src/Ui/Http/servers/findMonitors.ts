import * as monitorDal from "../../database/dal/monitor";
import {renderMonitors} from "../../views/monitors";

export const findMonitors = async (req: any, resp: any): Promise<void> => {
    resp.send(await renderMonitors(await monitorDal.findByServerId(req.params.id)))
}
