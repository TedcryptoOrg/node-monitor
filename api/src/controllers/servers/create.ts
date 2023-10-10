import { RequestHandler, Request, Response } from 'express';
import * as serverDal from "../../database/dal/server";

export const create: RequestHandler = (req: Request, resp: Response) => {
    const requiredFields = ["name", "address", "configuration_id"];
    requiredFields.forEach((field) => {
        if (!req.body[field]) {
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            return;
        }
    })

    serverDal.create({
        name: req.body.name,
        address: req.body.address,
        is_enabled: true,
        configuration_id: req.body.configuration_id
    }).then((configuration) => {
        resp.status(202).send(configuration)
    }).catch((err) => {
        resp.status(500).send({
            message:
                err.message || "Some error occurred while creating the Configuration."
        })
    })
}