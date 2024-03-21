import Configuration from "../../src/Domain/Configuration/Configuration";
import {myContainer} from "../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../src/Domain/DependencyInjection/types";
import ConfigurationRepository from "../../src/Domain/Configuration/ConfigurationRepository";
import NotificationChannel from "../../src/Domain/NotificationChannel/NotificationChannel";
import {NotificationChannelType} from "../../src/Domain/NotificationChannel/NotificationChannelType";
import NotificationChannelRepository from "../../src/Domain/NotificationChannel/NotificationChannelRepository";

export const createConfiguration = async (): Promise<Configuration> => {
    return myContainer.get<ConfigurationRepository>(TYPES.ConfigurationRepository).upsert(
        new Configuration(
            'test',
            'test',
            true
        )
    )
}

export const createNotificationChannel = async (): Promise<NotificationChannel> => {
    return await myContainer.get<NotificationChannelRepository>(TYPES.NotificationChannelRepository).upsert(
        new NotificationChannel(
            'test',
            NotificationChannelType.TELEGRAM,
            {},
        )
    )
}
