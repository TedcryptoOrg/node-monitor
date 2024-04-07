import {handleCommand} from "../handleCommandUtil";
import GetMonitorCommand from "../../../Application/Query/Monitor/GetMonitor/GetMonitorCommand";
import Monitor from "../../../Domain/Monitor/Monitor";

export const findById = async (req: any, resp: any): Promise<void> => {
    await handleCommand(
        new GetMonitorCommand(Number(req.params.id)),
        resp,
        (monitor: Monitor) => resp.status(200).send(monitor.toArray())
    );
}
