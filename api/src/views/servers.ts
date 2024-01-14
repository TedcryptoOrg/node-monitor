import Server, {ServerOutput} from "../database/models/server";
import {renderConfiguration} from "./configuration";
import {renderServices} from "./service";

export async function renderServers(Servers: Server[]|ServerOutput[], includeServices: boolean = false) {
    const result = [];
    for (const server of Servers) {
        result.push(await renderServer(server, includeServices))
    }

    return result;
}

export async function renderServer(server: Server|ServerOutput, includeServices: boolean = false): Promise<any> {
    return {
        id: server.id,
        name: server.name,
        address: server.address,
        is_enabled: server.is_enabled,
        configuration: await renderConfiguration(await server.getConfiguration()),
        services: includeServices ? await renderServices(await server.getServices()) : undefined,
        created_at: server.createdAt,
        updated_at: server.updatedAt
    }
}
