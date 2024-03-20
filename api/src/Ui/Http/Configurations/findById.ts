import {handleCommand} from "../handleCommandUtil";
import GetConfigurationCommand from "../../../Application/Query/Configuration/GetConfiguration/GetConfigurationCommand";
import Configuration from "../../../Domain/Configuration/Configuration";

export const findById = async (req: any, resp: any) => {
    await handleCommand(
        new GetConfigurationCommand(Number(req.params.id)),
        resp,
        (configuration: Configuration) => {
            // TODO: should handle getserver and getmonitor and put them all together
            resp.send({
                ...configuration.toArray(),
                servers: [],
                monitors: []
            })
        }
    )
}
