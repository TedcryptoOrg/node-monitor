import * as serverDal from "../../database/dal/server";

export const update = async (req: any, resp: any) => {
    if (req.params.id === undefined) {
        resp.status(400).send('Missing id')
        return
    }

    const requiredFields = ["name", "address", "configuration_id", "is_enabled"];
    requiredFields.forEach((field) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, field)) {
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            return;
        }
    })

    serverDal.update(Number(req.params.id), {
        name: req.body.name,
        address: req.body.address,
        configuration_id: req.body.configuration_id,
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