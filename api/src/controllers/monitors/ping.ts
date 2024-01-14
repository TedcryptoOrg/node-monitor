import * as monitorDal from "../../database/dal/monitor";
import {renderConfiguration} from "../../views/configuration";

export const ping = async (req: any, resp: any) => {
    if (req.params.id === undefined) {
        resp.status(400).send('Missing id')
        throw new Error('Missing id')
    }

    const requiredFields = ["status"];
    requiredFields.forEach((field) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, field)) {
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            throw new Error(`${field} can not be empty!`);
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
            throw new Error(err.message)
        }

        resp.status(500).send({message: err.message || "Some error occurred while updating the Configuration."})
    })
}