import * as configurationDal from "../../database/dal/configuration";

export const findById = async (req: any, resp: any) => {
    resp.send(await configurationDal.get(req.params.id))
}