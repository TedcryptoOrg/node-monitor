import Service , {ServiceInput, ServiceOutput} from "../models/service";

export const create = async (serviceInput: ServiceInput): Promise<ServiceOutput> => {
    return await Service.create(serviceInput)
}

export const getAll = async (): Promise<ServiceOutput[]> => {
    return await Service.findAll()
}

export const getByType = async (type: string): Promise<ServiceOutput[]> => {
    return await Service.findAll({
        where: {
            type: type,
            is_enabled: true
        }
    })
}