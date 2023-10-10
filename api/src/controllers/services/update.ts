import * as serviceDal from "../../database/dal/service";
import {SERVICE_TYPES} from "../../database/models/service";

export const update = async (req: any, resp: any) => {
    if (req.params.id === undefined) {
        resp.status(400).send('Missing id')
        return
    }

    const requiredFields = ["name", "address", "server_id", "type", "is_enabled"];
    requiredFields.forEach((field) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, field)) {
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            return;
        }
    })

    const validTypes = Object.keys(SERVICE_TYPES);
    if (!validTypes.includes(req.body.type)) {
        resp.status(400).send({
            message: `Invalid type ${req.body.type}`
        });
        return;
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
            return
        }

        resp.status(500).send({
            message:
                err.message || "Some error occurred while updating the Configuration."
        })
    })
}