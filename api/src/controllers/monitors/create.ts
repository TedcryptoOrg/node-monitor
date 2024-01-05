import { RequestHandler, Request, Response } from 'express';
import * as monitorDal from "../../database/dal/monitor";

export const create: RequestHandler = (req: Request, resp: Response) => {
    const requiredFields = ["name", "type", "configuration_id", "configuration_object"];
    requiredFields.forEach((field) => {
        if (!req.body[field]) {
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            return;
        }
    })
    // Check if configuration_object is an array or object and stringify it
    if (Array.isArray(req.body.configuration_object)) {
        req.body.configuration_object = JSON.stringify(req.body.configuration_object)
    } else if (typeof req.body.configuration_object === "object") {
        req.body.configuration_object = JSON.stringify(req.body.configuration_object)
    }

    monitorDal.create({
        name: req.body.name,
        type: req.body.type,
        configuration_id: req.body.configuration_id,
        configuration_object: req.body.configuration_object,
        is_enabled: req.body.is_enabled ?? true
    }).then((monitor) => {
        resp.status(202).send(monitor)
    }).catch((err) => {
        resp.status(500).send({
            message:
                err.message || "Some error occurred while creating the Configuration."
        })
    })
}