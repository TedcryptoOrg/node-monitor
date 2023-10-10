import * as monitorDal from "../../database/dal/monitor";

export const findAll = async (req: any, resp: any) => {
    resp.send(await monitorDal.getAll())
}