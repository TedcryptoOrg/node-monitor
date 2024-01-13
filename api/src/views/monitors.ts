import Monitor, {MonitorOutput} from "../database/models/monitor";
import {renderConfiguration} from "./configuration";
import {renderServer} from "./servers";

export async function renderMonitors(monitors: Monitor[]|MonitorOutput[]) {
    const results = [];
    for (const monitor of monitors) {
        results.push(await renderMonitor(monitor))
    }

    return results;
}

export async function renderMonitor(monitor: Monitor|MonitorOutput): Promise<any> {
    const server = await monitor.getServer();

    return {
        id: monitor.id,
        name: monitor.name,
        type: monitor.type,
        is_enabled: monitor.is_enabled,
        server: server ? await renderServer(server) : undefined,
        configuration: await renderConfiguration(await monitor.getConfiguration()),
        configuration_object: monitor.configuration_object,
        createdAt: monitor.createdAt,
        updatedAt: monitor.updatedAt,
        last_check: monitor.last_check,
        status: monitor.status,
        last_error: monitor.last_error,
    };
}