import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import User from "../../../Domain/User/User";
import ListAllUsersCommand from "../../../Application/Query/User/ListAllUser/ListAllUsersCommand";

export const list: RequestHandler = async (req: Request, resp: Response) => {
    await handleCommand(
        new ListAllUsersCommand(),
        resp,
        (users: User[]) => {
            resp.status(200).send({
                results: users.map((user: User) => user.toObject())
            })
        }
    );
}
