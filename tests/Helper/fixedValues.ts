import Configuration from "../../src/database/models/configuration";
import Server from "../../src/database/models/server";
import ServiceCheck from "../../src/database/models/monitor";
import Service from "../../src/database/models/service";

export async function createConfiguration(name: string, chain: string): Promise<Configuration> {
    return Configuration.create({
        name: name,
        chain: chain
    })
}

export async function createServer(name: string, ipAddress: string, configuration: Configuration): Promise<Server> {
    return Server.create({
        name: name,
        ip_address: ipAddress,
        configuration: configuration
    })
}

export async function createService(name: string, ipAddress: string, port: string, server: Server, isEnabled: boolean = true): Promise<Service> {
    return Service.create({
        name: name,
        ip_address: ipAddress,
        port: port,
        is_enabled: isEnabled,
        server: server,
    })
}

export async function createServiceCheck(name: string, type:string, ipAddress: string, port: string, service: Service, isEnabled: boolean = true): Promise<ServiceCheck> {
    return ServiceCheck.create({
        name: name,
        type: type,
        ip_address: ipAddress,
        port: port,
        is_enabled: isEnabled,
        service: service
    })
}
