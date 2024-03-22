import {handleCommand} from "../handleCommandUtil";
import FindAllMonitorsCommand from "../../../Application/Query/Monitor/FindAllMonitors/FindAllMonitorsCommand";
import Monitor from "../../../Domain/Monitor/Monitor";

export const findMonitors = async (req: any, resp: any): Promise<void> => {
    await handleCommand(
        new FindAllMonitorsCommand(
            undefined,
            Number(req.params.id),
        ),
        resp,
        (monitors: Monitor[]) => resp.send(monitors.map((monitor: Monitor) => monitor.toArray()))
    )
}
