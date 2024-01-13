import * as configurationDal from "../../database/dal/configuration";
import {renderConfiguration} from "../../views/configuration";

export const findById = async (req: any, resp: any) => {
    const configuration = await configurationDal.get(req.params.id)
    if (configuration === null) {
        resp.status(404).send({
            message: `Configuration with id ${req.params.id} not found`
        })
        return
    }

    resp.send(await renderConfiguration(configuration))
}