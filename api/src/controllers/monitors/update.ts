import * as monitorDal from "../../database/dal/monitor";

export const update = async (req: any, resp: any) => {
    if (req.params.id === undefined) {
        resp.status(400).send('Missing id')
        throw new Error('Missing id')
    }

    const requiredFields = ["name", "type", "configuration_id", "configuration_object", "is_enabled"];
    requiredFields.forEach((field) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, field)) {
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            throw new Error(`${field} can not be empty!`);
        }
    })

    monitorDal.update(Number(req.params.id), {
        name: req.body.name,
        type: req.body.type,
        configuration_id: req.body.configuration_id,
        configuration_object: req.body.configuration_object,
        server_id: req.body.server_id ?? null,
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