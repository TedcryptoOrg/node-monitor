import Configuration, {ConfigurationInput, ConfigurationOutput} from "../models/configuration";
import {RecordNotFound} from "../../exceptions/recordNotFound";

export const create = async (configuration: ConfigurationInput): Promise<ConfigurationOutput> => {
    return await Configuration.create(configuration)
}

export const update = async (id: number, configuration: ConfigurationInput): Promise<ConfigurationOutput> => {
    console.log(id, configuration)
    const configurationToUpdate = await Configuration.findByPk(id)
    if (configurationToUpdate === null) {
        throw new RecordNotFound(`Configuration with id ${id} not found`)
    }

    configurationToUpdate.set({
        name: configuration.name,
        chain: configuration.chain,
        is_enabled: configuration.is_enabled
    })
    await configurationToUpdate.save();

    return configurationToUpdate
}

export const deleteConfiguration = async (id: number): Promise<void> => {
    const configurationToDelete = await Configuration.findByPk(id)
    if (configurationToDelete === null) {
        throw new RecordNotFound(`Configuration with id ${id} not found`)
    }

    await configurationToDelete.destroy()
}

export const get = async (id: number): Promise<ConfigurationOutput | null> => {
    return await Configuration.findByPk(id)
}

export const getAll = async (): Promise<ConfigurationOutput[]> => {
    return await Configuration.findAll({
        include: Configuration.associations.monitors
    })
}
