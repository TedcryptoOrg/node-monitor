import { RequestHandler, Request, Response } from 'express';
import {handleCommand} from '../handleCommandUtil';
import UpsertConfigurationCommand from '../../../Application/Write/Configuration/UpsertConfiguration/UpsertConfigurationCommand';
import Configuration from "../../../Domain/Configuration/Configuration";

export const upsert: RequestHandler = async (req: Request, resp: Response) => {
    const requiredFields = ["name", "chain"];
    requiredFields.forEach((field) => {
        if (!req.body[field]) {
            resp.status(400).send({
                message: `${field} can not be empty!`
            });
            throw new Error(`${field} can not be empty!`);
        }
    })

    await handleCommand(
        new UpsertConfigurationCommand(
            req.body.name,
            req.body.chain,
            true,
            req.params.id ? Number(req.params.id) : undefined
        ),
        resp,
        (configuration: Configuration) => {
            resp.status(req.params.id ? 200 : 202).send(configuration.toArray())
        }
    )
}