import Service , {ServiceInput, ServiceOutput} from "../models/service";

export async function findByServerId(id: number): Promise<ServiceOutput[]> {
    return await Service.findAll({
        where: {
            server_id: id
        }
    })
}


export const create = async (serviceInput: ServiceInput): Promise<ServiceOutput> => {
    return await Service.create(serviceInput)
}

export function update(id: number, serviceInput: ServiceInput) {
    return Service.update(serviceInput, {where: {id: id}})
}

export const deleteService = async (id: number): Promise<void> => {
    await Service.destroy({where: {id: id}})
}

export const getAll = async (): Promise<ServiceOutput[]> => {
    return await Service.findAll()
}
