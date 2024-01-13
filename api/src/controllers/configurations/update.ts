import * as configurationDal from "../../database/dal/configuration";
import {renderConfiguration} from "../../views/configuration";

export const update = async (req: any, resp: any) => {
    if (req.params.id === undefined) {
        resp.status(400).send('Missing id')
        return
    }
    configurationDal.get(Number(req.params.id)).then((configuration) => {
        if (configuration === null) {
            resp.status(404).send({
                message: `Configuration with id ${req.params.id} not found`
            })
            return
        }
    });

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
        renderConfiguration(configuration)
            .then((renderedConfiguration) => resp.status(200).send(renderedConfiguration))
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