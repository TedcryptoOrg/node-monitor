import {Request, RequestHandler, Response} from "express";
import * as auditDal from "../../database/dal/audit";
import {renderAudits} from "../../views/audit";
import {handleCommand} from "../handleCommandUtil";
import FindLatestCommand from "../../../Application/Query/Audit/FindLatest/FindLatestCommand";

export const findLatest: RequestHandler = (req: Request, resp: Response) => {
    handleCommand(
        new FindLatestCommand(
            req.body.page ?? 1,
            req.body.numRecords ?? 100,
            req.body.limit ?? 100
        ),
        resp,
        async (audit) => resp.status(200).send(await renderAudits(audit))
    )
}