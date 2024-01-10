import Monitor , {MonitorInput, MonitorOutput} from "../models/monitor";
import {RecordNotFound} from "../../exceptions/recordNotFound";
import * as AuditDal from "./audit";
import {Op} from "sequelize";

export async function findWarnings(limit: number) {
    return await Monitor.findAll({
        where: {
            status: true,
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


export async function findByConfigurationId(id: number): Promise<MonitorOutput[]> {
    return await Monitor.findAll({where: {configuration_id: id}})
}

export async function findByServerId(id: number): Promise<MonitorOutput[]> {
    return await Monitor.findAll({where: {server_id: id}})
}

export async function getById(id: number): Promise<MonitorOutput> {
    const monitor = await Monitor.findByPk(id)
    if (monitor === null) {
        throw new RecordNotFound(`Monitor "${id}" not found`)
    }

    return monitor;
}

export const create = async (monitorInput: MonitorInput): Promise<MonitorOutput> => {
    await AuditDal.create({
        monitor_id: monitorInput.id ?? null,
        server_id: monitorInput.server_id ?? null,
        configuration_id: monitorInput.configuration_id ?? null,
        message: `Monitor ${monitorInput.name} created`,
        created_at: new Date(),
    })

    return await Monitor.create(monitorInput)
}

export const update = async (id: number, monitorInput: MonitorInput): Promise<[number]> => {
    await AuditDal.create({
        monitor_id: id,
        server_id: monitorInput.server_id ?? null,
        configuration_id: monitorInput.configuration_id ?? null,
        message: `Monitor ${monitorInput.name} edited`,
        created_at: new Date(),
    })

    return await Monitor.update(monitorInput, {where: {id: id}})
}

export const deleteMonitor = async (id: number): Promise<void> => {
    await AuditDal.create({
        monitor_id: id,
        server_id: null,
        configuration_id: null,
        message: `Monitor ${id} deleted`,
        created_at: new Date(),
    })

    await Monitor.destroy({where: {id: id}})
}

export const getAll = async (): Promise<MonitorOutput[]> => {
    return await Monitor.findAll()
}
