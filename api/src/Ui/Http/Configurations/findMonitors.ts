import {handleCommand} from "../handleCommandUtil";
import FindAllMonitorsCommand from "../../../Application/Query/Monitor/FindAllMonitors/FindAllMonitorsCommand";
import Monitor from "../../../Domain/Monitor/Monitor";

export const findMonitors = async (req: any, resp: any) => {
    await handleCommand(
        new FindAllMonitorsCommand(Number(req.params.id)),
        resp,
        (monitors: Monitor[]) => {
            resp.send(monitors.map(monitor => monitor.toArray()))
        }
    )
}
