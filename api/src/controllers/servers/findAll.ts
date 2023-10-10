import * as serverDal from "../../database/dal/server";

export const findAll = async (req: any, resp: any) => {
    resp.send(await serverDal.getAll())
}