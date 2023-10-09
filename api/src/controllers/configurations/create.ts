import { create as createConfiguration } from "../../database/dal/configuration";

export const create = (req: any, resp: any) => {
    const requiredFields = ["name", "chain"];
    requiredFields.forEach((field) => {
        if (!req.body[field]) {
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            return;
        }
    })

    createConfiguration({
        name: req.body.name,
        chain: req.body.chain,
        is_enabled: true
    }).then((configuration) => {
        resp.status(202).send(configuration)
    }).catch((err) => {
        resp.status(500).send({
            message:
                err.message || "Some error occurred while creating the Configuration."
        })
    })
}