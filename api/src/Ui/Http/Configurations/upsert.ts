import { RequestHandler, Request, Response } from 'express';
import {handleCommand} from '../handleCommandUtil';
import UpsertConfigurationCommand from '../../../Application/Write/Configuration/UpsertConfiguration/UpsertConfigurationCommand';
import Configuration from "../../../Domain/Configuration/Configuration";

export const upsert: RequestHandler = async (req: Request, resp: Response) => {
    const requiredFields = ["name", "chain", "is_enabled"];
    const missingFields = requiredFields.filter(field => !(field in req.body));
    if (missingFields.length) {
        resp.status(400).send(`Missing required fields: ${missingFields.join(", ")}`);
        return;
    }

    await handleCommand(
        new UpsertConfigurationCommand(
            req.body.name,
            req.body.chain,
            req.body.is_enabled,
            req.params.id ? Number(req.params.id) : undefined
        ),
        resp,
        (configuration: Configuration) => {
            resp.status(req.params.id ? 200 : 202).send(configuration.toArray())
        }
    )
}