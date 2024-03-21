import Monitor , {MonitorInput, MonitorOutput} from "../models/monitor";
import {RecordNotFound} from "../../exceptions/recordNotFound";
import * as AuditDal from "./audit";
import {Op} from "sequelize";

export async function findWarnings(limit: number) {
    return await Monitor.findAll({
        where: {
            status: true,
            is_enabled: true,
            last_error: {
                [Op.ne]: null
            }
        },
        limit: limit,
        order: [['last_check', 'DESC']]
    })
}


export async function findFailed(limit: number) {
    return await Monitor.findAll({
        where: {
            status: false,
            is_enabled: true
        },
        limit: limit,
        order: [['last_check', 'DESC']]
    })
}
