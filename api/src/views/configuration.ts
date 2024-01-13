import Configuration, {ConfigurationOutput} from "../database/models/configuration";
import {renderMonitors} from "./monitors";
import {renderServers} from "./servers";

export async function renderConfigurations(
    configurations: Configuration[]|ConfigurationOutput[],
    includeMonitors: boolean = false,
    includeServers: boolean = false
): Promise<any> {
    const result = []
    for (const configuration of configurations) {
        result.push(await renderConfiguration(configuration, includeMonitors, includeServers))
    }

    return result;
}

export async function renderConfiguration(configuration: Configuration|ConfigurationOutput, includeMonitors: boolean = false, includeServers: boolean = false): Promise<any> {
    return {
        id: configuration.id,
        name: configuration.name,
        createdAt: configuration.createdAt,
        updatedAt: configuration.updatedAt,
        monitors: includeMonitors ? await renderMonitors(await configuration.getMonitors()) : undefined,
        servers: includeServers ? await renderServers(await configuration.getServers(), true) : undefined,
    }
}
