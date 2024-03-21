import {handleCommand} from "../handleCommandUtil";
import FindAllMonitorsCommand from "../../../Application/Query/Monitor/FindAllMonitors/FindAllMonitorsCommand";
import Monitor from "../../../Domain/Monitor/Monitor";

export const findAll = async (req: any, resp: any) => {
    await handleCommand(
        new FindAllMonitorsCommand(),
        resp,
        (monitors: Monitor[]) => resp.status(200).send(
            monitors.map((monitor) => monitor.toArray())
        )
    );
}
