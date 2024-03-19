import { RequestHandler, Request, Response } from 'express';

import NotificationClientFactory from "../../services/notification/NotificationClientFactory";
import {parse} from "./payload/notificationPayload";

export const test: RequestHandler = async (req: Request, resp: Response) => {
    let payload = null;
    try {
        payload = parse(req)
    } catch (error: any) {
        resp.status(400).send({
            message: error.message
        });

        throw error;
    }
    console.log(payload)

    try {
        const client = NotificationClientFactory.createClient(payload);
        await client.sendMessage(`Test ${payload.name} notification channel successful!`);

        resp.status(200).send();
    } catch (error: any) {
        resp.status(500).send({
            message: error.message
        });

        throw error;
    }
}