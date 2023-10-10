import * as monitorDal from "../../database/dal/monitor";

export const update = async (req: any, resp: any) => {
    if (req.params.id === undefined) {
        resp.status(400).send('Missing id')
        return
    }

    const requiredFields = ["name", "type", "configuration_id", "configuration_object", "is_enabled"];
    requiredFields.forEach((field) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, field)) {
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            return;
        }
    })

    monitorDal.update(Number(req.params.id), {
        name: req.body.name,
        type: req.body.type,
        configuration_id: req.body.configuration_id,
        configuration_object: req.body.configuration_object,
        is_enabled: req.body.is_enabled
    }).then((configuration) => {
        resp.status(200).send(configuration)
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