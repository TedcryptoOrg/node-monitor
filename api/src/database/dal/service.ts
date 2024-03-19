import Service , {ServiceInput, ServiceOutput} from "../models/service";
import * as AuditDal from "./audit";

export async function findByServerId(id: number): Promise<ServiceOutput[]> {
    return await Service.findAll({
        where: {
            server_id: id
        }
    })
}


export const create = async (serviceInput: ServiceInput): Promise<ServiceOutput> => {
    await AuditDal.create({
        monitor_id: null,
        server_id: serviceInput.id ?? null,
        configuration_id: null,
        message: `Service ${serviceInput.name} created`,
        created_at: new Date(),
    })

    return await Service.create(serviceInput)
}

export const update = async (id: number, serviceInput: ServiceInput) => {
    await AuditDal.create({
        monitor_id: null,
        server_id: serviceInput.server_id ?? null,
        configuration_id: null,
        message: `Service ${serviceInput.name} edited`,
        created_at: new Date(),
    })

    return await Service.update(serviceInput, {where: {id: id}})
}

export const deleteService = async (id: number): Promise<void> => {
    await AuditDal.create({
        monitor_id: null,
        server_id: null,
        configuration_id: null,
        message: `Service ${id} deleted`,
        created_at: new Date(),
    })

    await Service.destroy({where: {id: id}})
}

export const getAll = async (): Promise<ServiceOutput[]> => {
    return await Service.findAll()
}
