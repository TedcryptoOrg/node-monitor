import { RequestHandler, Request, Response } from 'express';
import * as configurationDal from "../../database/dal/configuration";

export const create: RequestHandler = (req: Request, resp: Response) => {
    const requiredFields = ["name", "chain"];
    requiredFields.forEach((field) => {
        if (!req.body[field]) {
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            return;
        }
    })

    configurationDal.create({
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