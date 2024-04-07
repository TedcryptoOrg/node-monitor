import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import GetUserCommand from "../../../Application/Query/User/GetUser/GetUserCommand";
import User from "../../../Domain/User/User";

export const me: RequestHandler = async (req: Request, resp: Response) => {
    resp.status(200).send(resp.locals['user'].toObject());
}
