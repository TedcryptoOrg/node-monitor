import * as configurationDal from "../../database/dal/configuration";

export const update = async (req: any, resp: any) => {
    if (req.params.id === undefined) {
        resp.status(400).send('Missing id')
        return
    }

    const requiredFields = ["name", "chain", "is_enabled"];
    requiredFields.forEach((field) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, field)) {
            console.error(`${field} can not be empty!`);
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            return;
        }
    })

    configurationDal.update(Number(req.params.id), {
        name: req.body.name,
        chain: req.body.chain,
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