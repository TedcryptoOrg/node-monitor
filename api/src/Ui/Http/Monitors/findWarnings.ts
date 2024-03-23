import { RequestHandler, Request, Response } from 'express';
import {handleCommand} from "../handleCommandUtil";
import FindWarningsCommand from "../../../Application/Query/Monitor/FindWarnings/FindWarningsCommand";
import Monitor from "../../../Domain/Monitor/Monitor";

export const findWarnings: RequestHandler = async (req: Request, resp: Response): Promise<void> => {
    await handleCommand(
        new FindWarningsCommand(
            Number(req.query.limit ?? 100),
            Number(req.query.offset ?? 0)
        ),
        resp,
        (monitors: Monitor[]) => resp.status(200).send(
            monitors.map((monitor) => monitor.toArray())
        )
    )
}
