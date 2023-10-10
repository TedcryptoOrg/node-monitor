import * as serviceDal from "../../database/dal/service";

export const findAll = async (req: any, resp: any) => {
    resp.send(await serviceDal.getAll())
}