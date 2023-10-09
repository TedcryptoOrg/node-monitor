import {getAll} from "../../database/dal/configuration.ts";

export const findAll = async (req: any, resp: any) => {
    resp.send(JSON.stringify(await getAll()))
}