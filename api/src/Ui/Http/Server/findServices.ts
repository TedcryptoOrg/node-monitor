import {handleCommand} from "../handleCommandUtil";
import FindAllServicesCommand from "../../../Application/Query/Service/FindAllServices/FindAllServicesCommand";
import Service from "../../../Domain/Service/Service";

export const findServices = async (req: any, resp: any): Promise<void> => {
    await handleCommand(
        new FindAllServicesCommand(
            Number(req.params.id),
        ),
        resp,
        (services: Service[]) => resp.send(services.map((service: Service) => service.toArray()))
    )
}
