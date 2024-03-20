
export const getAll = async (): Promise<ConfigurationOutput[]> => {
    return await Configuration.findAll({
        include: Configuration.associations.monitors
    })
}
