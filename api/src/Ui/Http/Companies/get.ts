import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import GetCompanyCommand from "../../../Application/Query/Company/GetCompany/GetCompanyCommand";
import Company from "../../../Domain/User/Company";

export const get: RequestHandler = async (req: Request, resp: Response) => {
    await handleCommand(
        new GetCompanyCommand(Number(req.params.id)),
        resp,
        (company: Company) => {
            resp.status(200).send(company.toObject())
        }
    );
}
