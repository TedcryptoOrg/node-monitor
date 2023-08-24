import Configuration, {ConfigurationInput, ConfigurationOutput} from "../models/configuration";

export const create = async (configuration: ConfigurationInput): Promise<ConfigurationOutput> => {
    return await Configuration.create(configuration)
}

export const getAll = async (): Promise<ConfigurationOutput[]> => {
    return await Configuration.findAll()
}
