import Service, {ServiceOutput} from "../database/models/service";
import {renderServer} from "./servers";

export async function renderServices(services: Service[]|ServiceOutput[]) {
    const result = [];
    for (const service of services) {
        result.push(await renderService(service))
    }

    return result;
}

export async function renderService(service: Service|ServiceOutput): Promise<any> {
    return {
        id: service.id,
        name: service.name,
        address: service.address,
        is_enabled: service.is_enabled,
        type: service.type,
        server: await renderServer(await service.getServer()),
    };
}