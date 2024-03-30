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
import Service from "../../src/Domain/Service/Service";
import ServiceRepository from "../../src/Domain/Service/ServiceRepository";
import {ServiceType} from "../../src/Domain/Service/ServiceType";
import User from "../../src/Domain/User/User";
import UserRepository from "../../src/Domain/User/UserRepository";
import Company from "../../src/Domain/User/Company";
import CompanyRepository from "../../src/Domain/User/CompanyRepository";

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
            'https://server.url',
            true,
            configuration ?? await createConfiguration()
        )
    )
}

export const createService = async(server?: Server, type?: ServiceType, address?: string): Promise<Service> => {
    return await myContainer.get<ServiceRepository>(TYPES.ServiceRepository).upsert(
        new Service(
            'test',
            address ?? 'http://service.url',
            true,
            type ?? ServiceType.RPC,
            server ?? await createServer()
        )
    )
}

export const createMonitor = async(
    configuration?: Configuration,
    name?: string,
    isEnabled?: boolean,
    status?: boolean,
    lastError?: string,
    server?: Server
): Promise<Monitor> => {
    return await myContainer.get<MonitorRepository>(TYPES.MonitorRepository).upsert(
        new Monitor(
            name ?? 'test',
            MonitorType.BLOCK_CHECK,
            isEnabled ?? true,
            {},
            undefined,
            configuration ?? await createConfiguration(),
            server ?? await createServer(),
            new Date(),
            status ?? true,
            lastError ?? null
        )
    )
}

export const createCompany = async (name?: string): Promise<Company> => {
    return await myContainer.get<CompanyRepository>(TYPES.CompanyRepository)
        .upsert(new Company(
            name ?? 'test akash',
            true,
            [],
        ));
}

export const createUser = async (
    company?: Company,
    isAdmin?: boolean,
    isSuperAdmin?: boolean,
    username?: string
): Promise<User> => {
    return myContainer.get<UserRepository>(TYPES.UserRepository)
        .upsert(new User(
            username ?? 'test@example.com',
            true,
            isAdmin ?? true,
            isSuperAdmin ?? true,
            company ?? await createCompany(),
            'password',
            'password'
        ));
}