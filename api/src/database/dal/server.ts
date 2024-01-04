import Server, {ServerInput, ServerOutput} from "../models/server";
import {RecordNotFound} from "../../exceptions/recordNotFound";

export async function findByConfigurationId(id: number): Promise<ServerOutput[]> {
    return await Server.findAll({
        where: {
            configuration_id: id
        }
    })
}


export const create = async (serverInput: ServerInput): Promise<ServerOutput> => {
    return await Server.create(serverInput)
}

export const update = async (id: number, server: ServerInput): Promise<ServerOutput> => {
    const serverToUpdate = await Server.findByPk(id)
    if (serverToUpdate === null) {
        throw new RecordNotFound(`Configuration with id ${id} not found`)
    }

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

    await server.destroy()
}

export const getAll = async (): Promise<ServerOutput[]> => {
    return await Server.findAll()
}
