import {handleCommand} from "../handleCommandUtil";
import FindAllServicesCommand from "../../../Application/Query/Service/FindAllServices/FindAllServicesCommand";
import Service from "../../../Domain/Service/Service";

export const findAll = async (req: any, resp: any) => {
    await handleCommand(
        new FindAllServicesCommand(),
        resp,
        (services: Service[]) => resp.status(200).send(services.map((service) => service.toArray()))
    )
}
