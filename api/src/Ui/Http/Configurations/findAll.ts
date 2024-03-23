import {handleCommand} from "../handleCommandUtil";
import FindAllConfigurationsCommand from "../../../Application/Query/Configuration/FindAllConfigurations/FindAllConfigurationsCommand";
import Configuration from "../../../Domain/Configuration/Configuration";

export const findAll = async (req: any, resp: any) => {
    await handleCommand(
        new FindAllConfigurationsCommand(),
        resp,
        (configurations: Configuration[]) => {
            // TODO: for each configuration grab servers and monitors and notification_channels
            resp.send(configurations.map(configuration => configuration.toArray()))
        }
    )
}
