import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import UpsertUserCommand from "../../../Application/Write/User/UpsertUser/UpsertUserCommand";

export const upsert: RequestHandler = async (req: Request, resp: Response) => {
    if (req.method === 'PUT' && !req.params.id) {
        resp.status(400).send('ID is required for update')
        return
    }

    const requiredFields = [
        'username',
        'company_id',
        'is_active',
        'is_admin',
        'is_super_admin',
        req.method === 'PUT' ? undefined : 'raw_password'
    ]
    const missingFields = []
    for (const field of requiredFields) {
        if (field && !(field in req.body)) {
            missingFields.push(field)
        }
    }
    if (missingFields.length > 0) {
        console.error(`Missing required fields: ${missingFields.join(', ')}`)
        resp.status(400).send(`Missing required fields: ${missingFields.join(', ')}`)
        return
    }

    await handleCommand(
        new UpsertUserCommand(
            req.params.id ? Number(req.params.id) : undefined,
            req.body.username,
            req.body.is_active,
            req.body.is_admin,
            req.body.is_super_admin,
            req.body.company_id,
            req.body.raw_password ?? undefined
        ),
        resp,
        () => resp.status(req.method === 'PUT' ? 204 : 201).send(),
    );
}
