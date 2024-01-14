import * as serviceDal from "../../database/dal/service";
import {SERVICE_TYPES} from "../../database/models/service";

export const update = async (req: any, resp: any) => {
    if (req.params.id === undefined) {
        resp.status(400).send('Missing id')
        throw new Error('Missing id')
    }

    const requiredFields = ["name", "address", "server_id", "type", "is_enabled"];
    requiredFields.forEach((field) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, field)) {
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            throw new Error(`${field} can not be empty!`);
        }
    })

    const validTypes = Object.values(SERVICE_TYPES);
    if (!validTypes.includes(req.body.type)) {
        resp.status(400).send({
            message: `Invalid type ${req.body.type}`
        });
        throw new Error(`Invalid type ${req.body.type}`);
    }

    serviceDal.update(Number(req.params.id), {
        name: req.body.name,
        address: req.body.address,
        server_id: req.body.configuration_id,
        type: req.body.type,
        is_enabled: req.body.is_enabled
    }).then(() => {
        resp.status(200).send()
    }).catch((err: Error) => {
        if (err.name === 'RecordNotFound') {
            resp.status(404).send({
                message: err.message
            })
            throw new Error(err.message)
        }

        resp.status(500).send({
            message:
                err.message || "Some error occurred while updating the Configuration."
        })
    })
}