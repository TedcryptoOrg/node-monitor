import Event from '../../../Domain/Event/Event';
import EventHandler from "../../../Domain/Event/EventHandler";
import MonitorStatusChanged from "../Monitor/MonitorStatusChanged";
import {inject, injectable} from "inversify";
import NotificationChannelClientFactory
    from "../../../Domain/NotificationChannel/Client/NotificationChannelClientFactory";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import ConfigurationNotificationRepository from "../../../Domain/Configuration/ConfigurationNotificationRepository";

@injectable()
export default class MonitorStatusChangedHandler implements EventHandler {
    constructor(
        @inject(TYPES.NotificationChannelClientFactory) private notificationChannelClientFactory: NotificationChannelClientFactory,
        @inject(TYPES.ConfigurationNotificationRepository) private configurationNotificationRepository: ConfigurationNotificationRepository,
    ) {
    }

    async handle(event: MonitorStatusChanged): Promise<void> {
        console.log(event)
        if (!event.monitor.configuration?.id) {
            console.error('No configurations found to the monitor. Failed to fetch relation?', event)
            return;
        }

        const configurationNotificationChannels = await this.configurationNotificationRepository.findByConfigurationId(event.monitor.configuration.id);
        if (!configurationNotificationChannels) {
            console.warn('No configuration channels found for the configuration.')
            return;
        }

        for (const channel of configurationNotificationChannels) {
            if (!channel.notificationChannel) {
                console.error('No notification channel found. Is it possible to be orphan or failed to fetch relation?', channel)
                continue;
            }

            let title = `[Configuration: ${event.monitor.configuration.name}(${event.monitor.configuration.id})]`
            if (event.monitor.server) {
                title += `[Server: ${event.monitor.server.name}(${event.monitor.server.id})]`
            }
            title += `[Monitor: ${event.monitor.name}(${event.monitor.id})]`

            const client = this.notificationChannelClientFactory.createClient(channel.notificationChannel);
            if (event.monitor.status === true && !event.status && event.lastError) {
                await client.send(`🔴️${title} ${event.lastError}`);
            } else if (event.monitor.status === false && event.status) {
                event.lastError === null
                    ? await client.send(`🟢️${title} Monitor is back online`)
                    : await client.send(`🟠️${title} Recovering... ${event.lastError}`);
            } else if (event.monitor.status === true && event.status && null == event.lastError) {
                await client.send(`🟢️${title} Monitor is back online`);
            } else {
                await client.send(`🔵️${title} Unhandled status change. 
                Monitor status: ${event.monitor.status},
                Monitor last error: ${event.monitor.lastError}, 
                Ping status: ${event.status}, 
                Last error: ${event.lastError}`)
            }
        }
    }

    supports(event: Event): boolean {
        return event instanceof MonitorStatusChanged;
    }

}