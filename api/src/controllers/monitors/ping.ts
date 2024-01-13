import * as monitorDal from "../../database/dal/monitor";
import {renderConfiguration} from "../../views/configuration";

export const ping = async (req: any, resp: any) => {
    if (req.params.id === undefined) {
        resp.status(400).send('Missing id')
        return
    }

    const requiredFields = ["status"];
    requiredFields.forEach((field) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, field)) {
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            return;
        }
    })

    monitorDal.ping(Number(req.params.id), {
        status: req.body.status,
        last_error: req.body.last_error ?? null
    })
        .then(() => resp.status(202).send())
        .catch((err: Error) => {
        if (err.name === 'RecordNotFound') {
            resp.status(404).send({
                message: err.message
            })
            return
        }

        resp.status(500).send({message: err.message || "Some error occurred while updating the Configuration."})
    })
}