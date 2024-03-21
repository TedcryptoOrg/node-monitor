import * as serviceDal from "../../database/dal/service";
import {renderServices} from "../../views/service";

export const findServices = async (req: any, resp: any): Promise<void> => {
    resp.send(await renderServices(await serviceDal.findByServerId(req.params.id)))
}