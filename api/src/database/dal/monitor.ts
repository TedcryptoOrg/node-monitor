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

export async function ping(id: number, params: { last_error?: string|null; status: boolean }): Promise<void> {
    const monitor = await Monitor.findByPk(id);
    if (monitor === null) {
        throw new RecordNotFound(`Monitor with id ${id} not found`)
    }

    await AuditDal.create({
        monitor_id: id,
        server_id: monitor.server_id ?? null,
        configuration_id: monitor.configuration_id ?? null,
        message: `Monitor ${monitor.name} pinged. Status: ${params.status ? 'OK' : 'KO'}. Last error: ${params.last_error ?? 'none'}`,
        created_at: new Date(),
    })

    monitor.set({
        last_check: (new Date()).toString(),
        last_error: params.last_error ?? null,
        status: params.status
    })

    await monitor.save()
}
