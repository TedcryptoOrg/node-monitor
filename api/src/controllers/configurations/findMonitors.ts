import * as monitorDal from "../../database/dal/monitor";
import {renderMonitors} from "../../views/monitors";

export const findMonitors = async (req: any, resp: any) => {
    const monitors = await monitorDal.findByConfigurationId(req.params.id)

    resp.send(await renderMonitors(monitors))
}
