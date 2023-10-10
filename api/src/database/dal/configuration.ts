import Configuration, {ConfigurationInput, ConfigurationOutput} from "../models/configuration";

export const create = async (configuration: ConfigurationInput): Promise<ConfigurationOutput> => {
    return await Configuration.create(configuration)
}

export const get = async (id: number): Promise<ConfigurationOutput | null> => {
    return await Configuration.findByPk(id)
}

export const getAll = async (): Promise<ConfigurationOutput[]> => {
    return await Configuration.findAll({
        include: Configuration.associations.monitors
    })
}
