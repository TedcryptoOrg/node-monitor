import Monitor , {MonitorInput, MonitorOutput} from "../models/monitor";
import {RecordNotFound} from "../../exceptions/recordNotFound";

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
    return await Monitor.create(monitorInput)
}

export const update = async (id: number, monitorInput: MonitorInput): Promise<[number]> => {
    return await Monitor.update(monitorInput, {where: {id: id}})
}

export const deleteMonitor = async (id: number): Promise<void> => {
    await Monitor.destroy({where: {id: id}})
}

export const getAll = async (): Promise<MonitorOutput[]> => {
    return await Monitor.findAll()
}
