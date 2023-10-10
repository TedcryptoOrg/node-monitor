import * as configurationDal from "../../database/dal/configuration";

export const findAll = async (req: any, resp: any) => {
    resp.send(await configurationDal.getAll())
}