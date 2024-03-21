import Server, {ServerInput, ServerOutput} from "../models/server";

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

export const getAll = async (): Promise<ServerOutput[]> => {
    return await Server.findAll()
}
