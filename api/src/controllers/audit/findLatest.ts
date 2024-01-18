import {Request, RequestHandler, Response} from "express";
import * as auditDal from "../../database/dal/audit";
import {renderAudits} from "../../views/audit";

export const findLatest: RequestHandler = (req: Request, resp: Response) => {
    auditDal.findLatest(
        req.body.page ?? 1,
        req.body.numRecords ?? 100,
        req.body.limit ?? 100
    ).then(async (audit) => {
        resp.status(200).send(await renderAudits(audit))
    }).catch((err) => {
        resp.status(500).send({
            message:
                err.message || "Some error occurred while finding Audit records."
        })
    })
}