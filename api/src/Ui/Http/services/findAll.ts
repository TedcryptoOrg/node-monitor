import * as serviceDal from "../../database/dal/service";
import {renderServices} from "../../views/service";

export const findAll = async (req: any, resp: any) => {
    resp.send(await renderServices(await serviceDal.getAll()))
}
