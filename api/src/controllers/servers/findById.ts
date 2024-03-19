import * as serverDal from "../../database/dal/server";
import {renderServer} from "../../views/servers";

export const findById = async (req: any, resp: any): Promise<void> => {
    try {
        resp.send(await renderServer(await serverDal.get(req.params.id), true))
    } catch (error) {
        resp.status(404).send({message: `Server with id ${req.params.id} not found`})
    }
}