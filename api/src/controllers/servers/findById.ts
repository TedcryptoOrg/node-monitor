import * as serverDal from "../../database/dal/server";

export const findById = async (req: any, resp: any): Promise<void> => {
    try {
        resp.send(await serverDal.get(req.params.id))
    } catch (error) {
        resp.status(404).send({message: `Server with id ${req.params.id} not found`})
    }
}