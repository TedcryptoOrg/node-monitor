import Configuration from "../../src/Domain/Configuration/Configuration";
import {myContainer} from "../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../src/Domain/DependencyInjection/types";
import ConfigurationRepository from "../../src/Domain/Configuration/ConfigurationRepository";
import NotificationChannel from "../../src/Domain/NotificationChannel/NotificationChannel";
import {NotificationChannelType} from "../../src/Domain/NotificationChannel/NotificationChannelType";
import NotificationChannelRepository from "../../src/Domain/NotificationChannel/NotificationChannelRepository";
import Server from "../../src/Domain/Server/Server";
import ServerRepository from "../../src/Domain/Server/ServerRepository";
import Monitor from "../../src/Domain/Monitor/Monitor";
import MonitorRepository from "../../src/Domain/Monitor/MonitorRepository";
import {MonitorType} from "../../src/Domain/Monitor/MonitorType";
import ConfigurationNotification from "../../src/Domain/Configuration/ConfigurationNotification";
import ConfigurationNotificationRepository from "../../src/Domain/Configuration/ConfigurationNotificationRepository";

export const createConfiguration = async (): Promise<Configuration> => {
    return myContainer.get<ConfigurationRepository>(TYPES.ConfigurationRepository).upsert(
        new Configuration(
            'test',
            'test',
            true
        )
    )
}

export const createNotificationChannel = async (name?: string, isEnabled?: boolean): Promise<NotificationChannel> => {
    return await myContainer.get<NotificationChannelRepository>(TYPES.NotificationChannelRepository).upsert(
        new NotificationChannel(
            name ?? 'test',
            NotificationChannelType.TELEGRAM,
            {},
            isEnabled ?? true
        )
    )
}

export const createConfigurationNotification = async(): Promise<ConfigurationNotification> => {
    return await myContainer.get<ConfigurationNotificationRepository>(TYPES.ConfigurationNotificationRepository)
        .upsert(
            new ConfigurationNotification(
                await createConfiguration(),
                await createNotificationChannel()
            )
        )
}

export const createServer = async(configuration?: Configuration): Promise<Server> => {
    return await myContainer.get<ServerRepository>(TYPES.ServerRepository).upsert(
        new Server(
            'test',
            'test',
            true,
            configuration ?? await createConfiguration()
        )
    )
}

export const createMonitor = async(configuration?: Configuration): Promise<Monitor> => {
    return await myContainer.get<MonitorRepository>(TYPES.MonitorRepository).upsert(
        new Monitor(
            'test',
            MonitorType.BLOCK_CHECK,
            true,
            {},
            undefined,
            configuration ?? await createConfiguration(),
            await createServer(),
            new Date(),
            true,
            null
        )
    )
}
