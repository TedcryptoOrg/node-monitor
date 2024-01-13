import * as monitorDal from "../../database/dal/monitor";
import {renderMonitors} from "../../views/monitors";

export const findAll = async (req: any, resp: any) => {
    resp.send(await renderMonitors(await monitorDal.getAll()))
}