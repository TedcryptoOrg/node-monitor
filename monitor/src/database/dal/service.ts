import Service , {ServiceInput, ServiceOutput} from "../models/service";

export const create = async (serviceInput: ServiceInput): Promise<ServiceOutput> => {
    return await Service.create(serviceInput)
}

export const getAll = async (): Promise<ServiceOutput[]> => {
    return await Service.findAll()
}
