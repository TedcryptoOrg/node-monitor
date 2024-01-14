import Monitor, {MonitorOutput} from "../database/models/monitor";
import {renderConfiguration} from "./configuration";
import {renderServer} from "./servers";

export async function renderMonitors(monitors: Monitor[]|MonitorOutput[], includeServerServices: boolean = false) {
    const results = [];
    for (const monitor of monitors) {
        results.push(await renderMonitor(monitor, includeServerServices))
    }

    return results;
}

export async function renderMonitor(monitor: Monitor|MonitorOutput, includeServerServices: boolean = false): Promise<any> {
    const server = await monitor.getServer();

    return {
        id: monitor.id,
        name: monitor.name,
        type: monitor.type,
        is_enabled: monitor.is_enabled,
        server: server ? await renderServer(server, includeServerServices) : undefined,
        configuration: await renderConfiguration(await monitor.getConfiguration()),
        configuration_object: monitor.configuration_object,
        createdAt: monitor.createdAt,
        updatedAt: monitor.updatedAt,
        last_check: monitor.last_check,
        status: monitor.status,
        last_error: monitor.last_error,
    };
}