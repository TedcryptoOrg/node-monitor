import Configuration, {ConfigurationOutput} from "../database/models/configuration";
import {renderMonitors} from "./monitors";
import {renderServers} from "./servers";
import {renderNotificationChannel} from "./notificationChannels";
import {findByConfigurationId} from "../database/dal/configurationNotificationChannels";

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
    const channels = [];
    const configurationNotificationChannels = await findByConfigurationId(configuration.id);
    for (const configurationNotificationChannel of configurationNotificationChannels) {
        channels.push({
            id: configurationNotificationChannel.id,
            channel: await renderNotificationChannel(await configurationNotificationChannel.getNotificationChannel())
        })
    }

    return {
        id: configuration.id,
        name: configuration.name,
        chain: configuration.chain,
        is_enabled: configuration.is_enabled,
        createdAt: configuration.createdAt,
        updatedAt: configuration.updatedAt,
        monitors: includeMonitors ? await renderMonitors(await configuration.getMonitors(), true) : undefined,
        servers: includeServers ? await renderServers(await configuration.getServers(), true) : undefined,
        notification_channels: channels,
    }
}
