import Server, {ServerInput, ServerOutput} from "../models/server";
import {RecordNotFound} from "../../exceptions/recordNotFound";
import * as AuditDal from "./audit";

export async function get(id: number): Promise<ServerOutput> {
    const server = await Server.findByPk(id)
    if (server === null) {
        throw new RecordNotFound(`Server with id ${id} not found`)
    }

    return server
}


export async function findByConfigurationId(id: number): Promise<ServerOutput[]> {
    return await Server.findAll({
        where: {
            configuration_id: id
        }
    })
}


export const create = async (serverInput: ServerInput): Promise<ServerOutput> => {
    await AuditDal.create({
        monitor_id: null,
        server_id: serverInput.id ?? null,
        configuration_id: serverInput.configuration_id ?? null,
        message: `Server ${serverInput.name} created`,
        created_at: new Date(),
    })

    return await Server.create(serverInput)
}

export const update = async (id: number, server: ServerInput): Promise<ServerOutput> => {
    const serverToUpdate = await Server.findByPk(id)
    if (serverToUpdate === null) {
        throw new RecordNotFound(`Configuration with id ${id} not found`)
    }

    await AuditDal.create({
        monitor_id: null,
        server_id: id,
        configuration_id: server.configuration_id ?? null,
        message: `Server ${server.name} edited`,
        created_at: new Date(),
    })

    serverToUpdate.set({
        name: server.name,
        is_enabled: server.is_enabled,
        address: server.address,
        configuration_id: server.configuration_id
    })

    await serverToUpdate.save();

    return serverToUpdate
}

export const deleteServer = async (id: number): Promise<void> => {
    const server = await Server.findByPk(id)
    if (server === null) {
        throw new RecordNotFound(`Configuration with id ${id} not found`)
    }

    await AuditDal.create({
        monitor_id: null,
        server_id: id,
        configuration_id: server.configuration_id ?? null,
        message: `Server ${server.name} deleted`,
        created_at: new Date(),
    })

    await server.destroy()
}

export const getAll = async (): Promise<ServerOutput[]> => {
    return await Server.findAll()
}
