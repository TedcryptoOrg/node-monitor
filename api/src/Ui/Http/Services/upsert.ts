import { RequestHandler, Request, Response } from 'express';
import {handleCommand} from "../handleCommandUtil";
import UpsertServiceCommand from "../../../Application/Write/Service/UpsertService/UpsertServiceCommand";
import Service from "../../../Domain/Service/Service";
import {ServiceType} from "../../../Domain/Service/ServiceType";

export const upsert: RequestHandler = async (req: Request, resp: Response) => {
    const requiredFields = ["name", "address", "server_id", "type", "is_enabled"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
        resp.status(400).send({
            message: `Missing required fields: ${missingFields.join(", ")}`
        });
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    await handleCommand(
        new UpsertServiceCommand(
            req.body.server_id,
            req.body.name,
            req.body.address,
            req.body.is_enabled,
            req.body.type as ServiceType,
            req.params.id ? Number(req.params.id) : undefined
        ),
        resp,
        (service: Service) => resp.status(req.params.id ? 200 : 202).send(service.toArray())
    )
}
