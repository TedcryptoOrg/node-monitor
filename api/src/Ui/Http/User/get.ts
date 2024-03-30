import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import GetUserCommand from "../../../Application/Query/User/GetUser/GetUserCommand";
import User from "../../../Domain/User/User";

export const get: RequestHandler = async (req: Request, resp: Response) => {
    await handleCommand(
        new GetUserCommand(Number(req.params.id)),
        resp,
        (user: User) => {
            resp.status(200).send(user.toObject())
        }
    );
}
