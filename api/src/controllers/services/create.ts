import { RequestHandler, Request, Response } from 'express';
import * as serviceDal from "../../database/dal/service";
import {SERVICE_TYPES} from "../../database/models/service";

export const create: RequestHandler = (req: Request, resp: Response) => {
    const requiredFields = ["name", "address", "server_id", "type"];
    requiredFields.forEach((field) => {
        if (!req.body[field]) {
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            return;
        }
    })

    const validTypes = Object.values(SERVICE_TYPES);
    if (!validTypes.includes(req.body.type)) {
        resp.status(400).send({
            message: `Invalid type ${req.body.type}`
        });
        return;
    }

    serviceDal.create({
        name: req.body.name,
        address: req.body.address,
        server_id: req.body.server_id,
        type: req.body.type,
        is_enabled: true
    }).then((service) => {
        resp.status(202).send(service)
    }).catch((err) => {
        resp.status(500).send({
            message:
                err.message || "Some error occurred while creating the Configuration."
        })
    })
}