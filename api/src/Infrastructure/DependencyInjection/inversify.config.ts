import { Container } from 'inversify';
import CommandHandlerManager from '../CommandHandler/CommandHandlerManager';
import {TYPES} from '../../Domain/DependencyInjection/types';
import CommandHandler from '../../Domain/Command/CommandHandler';
import {PrismaClient} from '@prisma/client';
import AuditRepository from '../../Domain/Audit/AuditRepository';
import OrmAuditRepository from '../Orm/Audit/OrmAuditRepository';
import FindLatestCommandHandler from '../../Application/Query/Audit/FindLatest/FindLatestCommandHandler';
import EventDispatcher from '../../Application/Event/EventDispatcher/EventDispatcher';
import ConfigurationRepository from '../../Domain/Configuration/ConfigurationRepository';
import OrmConfigurationRepository from '../Orm/Configuration/OrmConfigurationRepository';
import UpsertConfigurationCommandHandler from '../../Application/Write/Configuration/UpsertConfiguration/UpsertConfigurationCommandHandler';
import DeleteConfigurationCommandHandler
    from "../../Application/Write/Configuration/DeleteConfiguration/DeleteConfigurationCommandHandler";
import GetConfigurationCommandHandler
    from "../../Application/Query/Configuration/GetConfiguration/GetConfigurationCommandHandler";
import FindAllConfigurationsCommandHandler
    from "../../Application/Query/Configuration/FindAllConfigurations/FindAllConfigurationsCommandHandler";
import NotificationChannelRepository from "../../Domain/NotificationChannel/NotificationChannelRepository";
import OrmNotificationChannel from "../Orm/NotificationChannel/OrmNotificationChannel";
import UpsertNotificationChannelCommandHandler
    from "../../Application/Write/NotificationChannel/UpsertNotificationChannel/UpsertNotificationChannelCommandHandler";
import DeleteNotificationChannelCommandHandler
    from "../../Application/Write/NotificationChannel/DeleteNotificationChannel/DeleteNotificationChannelCommandHandler";
import FindAllNotificationChannelsCommandHandler
    from "../../Application/Query/NotificationChannel/FindAllNotificationChannels/FindAllNotificationChannelsCommandHandler";
import TestNotificationChannelCommandHandler
    from "../../Application/Write/NotificationChannel/TestNotificationChannel/TestNotificationChannelCommandHandler";
import NotificationChannelClientFactory from "../../Domain/NotificationChannel/Client/NotificationChannelClientFactory";
import NotificationClientFactory from "../NotificationChannel/NotificationClientFactory";
import DeleteServerCommandHandler from "../../Application/Write/Server/DeleteServer/DeleteServerCommandHandler";
import UpsertServerCommandHandler from "../../Application/Write/Server/UpsertConfiguration/UpsertServerCommandHandler";
import ServerRepository from "../../Domain/Server/ServerRepository";
import OrmServerRepository from "../Orm/Server/OrmServerRepository";
import FindAllServerCommandHandler from "../../Application/Query/Server/FindAllServers/FindAllServerCommandHandler";
import GetServerCommandHandler from "../../Application/Query/Server/GetServer/GetServerCommandHandler";

const myContainer = new Container();

// Repositories
myContainer.bind<PrismaClient>(TYPES.OrmClient).toConstantValue(new PrismaClient());
myContainer.bind<AuditRepository>(TYPES.AuditRepository).to(OrmAuditRepository);
myContainer.bind<ConfigurationRepository>(TYPES.AuditRepository).to(OrmConfigurationRepository);
myContainer.bind<ServerRepository>(TYPES.ServerRepository).to(OrmServerRepository);
myContainer.bind<NotificationChannelRepository>(TYPES.NotificationChannelRepository).to(OrmNotificationChannel);

// Command handlers
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(FindLatestCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(UpsertConfigurationCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(DeleteConfigurationCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(GetConfigurationCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(FindAllConfigurationsCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(UpsertNotificationChannelCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(DeleteNotificationChannelCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(FindAllNotificationChannelsCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(TestNotificationChannelCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(DeleteServerCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(UpsertServerCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(FindAllServerCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(GetServerCommandHandler);
myContainer.bind<CommandHandlerManager>(CommandHandlerManager).toSelf();

// Events
myContainer.bind<EventDispatcher>(EventDispatcher).toSelf();

// Factories
myContainer.bind(NotificationClientFactory).toSelf();
myContainer.bind<NotificationChannelClientFactory>(TYPES.NotificationChannelClientFactory).to(NotificationClientFactory);

// Security

// Services

// Console Command

export { myContainer };
