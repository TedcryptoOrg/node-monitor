import Server, {ServerInput, ServerOutput} from "../models/server";

export const create = async (serverInput: ServerInput): Promise<ServerOutput> => {
    return await Server.create(serverInput)
}

export const getAll = async (): Promise<ServerOutput[]> => {
    return await Server.findAll()
}

export const getByConfigurationId = async (configurationId: number): Promise<ServerOutput[]> => {
    return await Server.findAll({
        where: {
            configuration_id: configurationId
        }
    })
}
