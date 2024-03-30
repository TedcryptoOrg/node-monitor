import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import DeleteUserCommand from "../../../Application/Write/User/DeleteUser/DeleteUserCommand";

export const remove: RequestHandler = async (req: Request, resp: Response) => {
    await handleCommand(
        new DeleteUserCommand(Number(req.params.id)),
        resp,
        () => resp.status(200).send()
    );
}
