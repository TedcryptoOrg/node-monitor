import { Container } from 'inversify';
import CommandHandlerManager from '../CommandHandler/CommandHandlerManager';
import {TYPES} from '../../Domain/DependencyInjection/types';
import CommandHandler from '../../Domain/Command/CommandHandler';
import {PrismaClient} from '@prisma/client';
import AuditRepository from '../../Domain/Audit/AuditRepository';
import OrmAuditRepository from '../Orm/Audit/OrmAuditRepository';
import FindLatestCommandHandler from '../../Application/Query/Audit/FindLatest/FindLatestCommandHandler';
import EventDispatcher from '../../Application/Event/EventDispatcher';
import ConfigurationRepository from '../../Domain/Configuration/ConfigurationRepository';
import OrmConfigurationRepository from '../Orm/Configuration/OrmConfigurationRepository';
import UpsertConfigurationCommandHandler from '../../Application/Write/Configuration/UpsertConfiguration/UpsertConfigurationCommandHandler';
import DeleteConfigurationCommandHandler from "../../Application/Write/Configuration/DeleteConfiguration/DeleteConfigurationCommandHandler";
import GetConfigurationCommandHandler from "../../Application/Query/Configuration/GetConfiguration/GetConfigurationCommandHandler";
import FindAllConfigurationsCommandHandler from "../../Application/Query/Configuration/FindAllConfigurations/FindAllConfigurationsCommandHandler";
import NotificationChannelRepository from "../../Domain/NotificationChannel/NotificationChannelRepository";
import OrmNotificationChannelRepository from "../Orm/NotificationChannel/OrmNotificationChannelRepository";
import UpsertNotificationChannelCommandHandler from "../../Application/Write/NotificationChannel/UpsertNotificationChannel/UpsertNotificationChannelCommandHandler";
import DeleteNotificationChannelCommandHandler from "../../Application/Write/NotificationChannel/DeleteNotificationChannel/DeleteNotificationChannelCommandHandler";
import FindAllNotificationChannelsCommandHandler from "../../Application/Query/NotificationChannel/FindAllNotificationChannels/FindAllNotificationChannelsCommandHandler";
import TestNotificationChannelCommandHandler from "../../Application/Write/NotificationChannel/TestNotificationChannel/TestNotificationChannelCommandHandler";
import NotificationChannelClientFactory from "../../Domain/NotificationChannel/Client/NotificationChannelClientFactory";
import NotificationClientFactory from "../NotificationChannel/NotificationClientFactory";
import DeleteServerCommandHandler from "../../Application/Write/Server/DeleteServer/DeleteServerCommandHandler";
import UpsertServerCommandHandler from "../../Application/Write/Server/UpsertServer/UpsertServerCommandHandler";
import ServerRepository from "../../Domain/Server/ServerRepository";
import OrmServerRepository from "../Orm/Server/OrmServerRepository";
import FindAllServerCommandHandler from "../../Application/Query/Server/FindAllServers/FindAllServerCommandHandler";
import GetServerCommandHandler from "../../Application/Query/Server/GetServer/GetServerCommandHandler";
import GetMonitorCommandHandler from "../../Application/Query/Monitor/GetMonitor/GetMonitorCommandHandler";
import FindAllMonitorsCommandHandler from "../../Application/Query/Monitor/FindAllMonitors/FindAllMonitorsCommandHandler";
import DeleteMonitorCommandHandler from "../../Application/Write/Monitor/DeleteMonitor/DeleteMonitorCommandHandler";
import PingMonitorCommandHandler from "../../Application/Write/Monitor/PingMonitor/PingMonitorCommandHandler";
import UpsertMonitorCommandHandler from "../../Application/Write/Monitor/UpsertMonitor/UpsertMonitorCommandHandler";
import MonitorRepository from "../../Domain/Monitor/MonitorRepository";
import OrmMonitorRepository from "../Orm/Monitor/OrmMonitorRepository";
import ConfigurationNotificationRepository from "../../Domain/Configuration/ConfigurationNotificationRepository";
import OrmConfigurationNotificationRepository from "../Orm/Configuration/OrmConfigurationNotificationRepository";
import AssociateNotificationChannelCommandHandler from "../../Application/Write/Configuration/AssociateNotificationChannel/AssociateNotificationChannelCommandHandler";
import RemoveAssociationWithNotificationChannelCommandHandler from "../../Application/Write/Configuration/RemoveAssociationWithNotificationChannel/RemoveAssociationWithNotificationChannelCommandHandler";
import FindConfigurationNotificationsCommandHandler from "../../Application/Query/Configuration/FindConfigurationNotifications/FindConfigurationNotificationsCommandHandler";
import FindWarningsCommandHandler from "../../Application/Query/Monitor/FindWarnings/FindWarningsCommandHandler";
import FindFailedCommandHandler from "../../Application/Query/Monitor/FindFailed/FindFailedCommandHandler";
import DeleteServiceCommandHandler from "../../Application/Write/Service/DeleteService/DeleteServiceCommandHandler";
import UpsertServiceCommandHandler from "../../Application/Write/Service/UpsertService/UpsertServiceCommandHandler";
import FindAllServicesCommandHandler from "../../Application/Query/Service/FindAllServices/FindAllServicesCommandHandler";
import ServiceRepository from "../../Domain/Service/ServiceRepository";
import OrmServiceRepository from "../Orm/Services/OrmServiceRepository";
import ServerMetricsExporter from "../../Domain/Server/ServerMetricsExporter";
import {PrometheusParser} from "../Server/Prometheus/PrometheusParser";
import ServerMetricsExplorerClient from "../Server/ServerMetricsExplorerClient";
import GetMetricsCommandHandler from "../../Application/Query/Server/GetMetrics/GetMetricsCommandHandler";
import GetNotificationChannelCommandHandler
    from "../../Application/Query/NotificationChannel/GetNotificationChannel/GetNotificationChannelCommandHandler";
import {EventDispatcher as EventDispatcherInterface} from "../../Domain/Event/EventDispatcher";
import EventHandler from "../../Domain/Event/EventHandler";
import MonitorStatusChangedHandler from "../../Application/Event/NotificationChannel/MonitorStatusChangedHandler";
import UserRepository from "../../Domain/User/UserRepository";
import OrmUserRepository from "../Orm/User/Prisma/OrmUserRepository";
import CompanyRepository from "../../Domain/User/CompanyRepository";
import OrmCompanyRepository from "../Orm/User/Prisma/OrmCompanyRepository";
import SecurityProvider from "../../Domain/Security/SecurityProvider";
import {PasswordEncoder} from "../../Domain/Security/PasswordEncoder";
import JwtProvider from "../Security/Jwt/JwtProvider";
import ArgonPasswordEncoder from "../Security/Argon/ArgonPasswordEncoder";
import CreateUser from "../../Ui/Console/CreateUser";
import GetUserCommandHandler from "../../Application/Query/User/GetUser/GetUserCommandHandler";
import GetCompanyCommandHandler from "../../Application/Query/Company/GetCompany/GetCompanyCommandHandler";
import DeleteUserCommandHandler from "../../Application/Write/User/DeleteUser/DeleteUserCommandHandler";
import DeleteCompanyCommandHandler from "../../Application/Write/Companies/DeleteCompany/DeleteCompanyCommandHandler";
import UpsertUserCommandHandler from "../../Application/Write/User/UpsertUser/UpsertUserCommandHandler";
import UpsertCompanyCommandHandler from "../../Application/Write/Companies/UpsertCompany/UpsertCompanyCommandHandler";
import ListAllUsersCommandHandler from "../../Application/Query/User/ListAllUser/ListAllUsersCommandHandler";
import ListAllCompaniesCommandHandler
    from "../../Application/Query/Company/ListAllCompanies/ListAllCompaniesCommandHandler";
import LoginCommandHandler from "../../Application/Query/Login/LoginCommandHandler";
import WsMonitorController from "../Monitor/WsMonitorController";
import MonitorController from "../../Application/Monitor/MonitorController";
import MonitorControllerEventHandler from "../../Application/Event/Monitor/MonitorControllerEventHandler";
import AxiosHttpClient from "../Http/AxiosHttpClient";
import {HttpClient} from "../../Domain/Http/HttpClient";
import {PARAMS} from "./params";

const myContainer = new Container();

// Params
myContainer.bind<string>(PARAMS.wsMonitorAddress).toConstantValue('ws://host.docker.internal:8081')

// Repositories
myContainer.bind<PrismaClient>(TYPES.OrmClient).toConstantValue(new PrismaClient());
myContainer.bind<AuditRepository>(TYPES.AuditRepository).to(OrmAuditRepository);
myContainer.bind<ConfigurationRepository>(TYPES.ConfigurationRepository).to(OrmConfigurationRepository);
myContainer.bind<ServerRepository>(TYPES.ServerRepository).to(OrmServerRepository);
myContainer.bind<MonitorRepository>(TYPES.MonitorRepository).to(OrmMonitorRepository);
myContainer.bind<NotificationChannelRepository>(TYPES.NotificationChannelRepository).to(OrmNotificationChannelRepository);
myContainer.bind<ConfigurationNotificationRepository>(TYPES.ConfigurationNotificationRepository).to(OrmConfigurationNotificationRepository);
myContainer.bind<ServiceRepository>(TYPES.ServiceRepository).to(OrmServiceRepository);
myContainer.bind<UserRepository>(TYPES.UserRepository).to(OrmUserRepository);
myContainer.bind<CompanyRepository>(TYPES.CompanyRepository).to(OrmCompanyRepository);

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
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(GetMonitorCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(FindAllMonitorsCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(DeleteMonitorCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(PingMonitorCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(UpsertMonitorCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(AssociateNotificationChannelCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(RemoveAssociationWithNotificationChannelCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(FindConfigurationNotificationsCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(FindWarningsCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(FindFailedCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(DeleteServiceCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(UpsertServiceCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(FindAllServicesCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(GetMetricsCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(GetNotificationChannelCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(GetUserCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(GetCompanyCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(DeleteUserCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(DeleteCompanyCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(UpsertUserCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(UpsertCompanyCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(ListAllUsersCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(ListAllCompaniesCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(LoginCommandHandler);
myContainer.bind<CommandHandlerManager>(CommandHandlerManager).toSelf();

// Events
myContainer.bind<EventHandler>(TYPES.EventHandler).to(MonitorStatusChangedHandler);
myContainer.bind<EventHandler>(TYPES.EventHandler).to(MonitorControllerEventHandler);
myContainer.bind<EventDispatcherInterface>(TYPES.EventDispatcher).to(EventDispatcher);

// Factories
myContainer.bind(NotificationClientFactory).toSelf();
myContainer.bind<NotificationChannelClientFactory>(TYPES.NotificationChannelClientFactory).to(NotificationClientFactory);

// Security
myContainer.bind<SecurityProvider>(TYPES.SecurityProvider).to(JwtProvider);
myContainer.bind<PasswordEncoder>(TYPES.PasswordEncoder).to(ArgonPasswordEncoder);

// Services
myContainer.bind<HttpClient>(TYPES.HttpClient).to(AxiosHttpClient);
myContainer.bind(PrometheusParser).toSelf();
myContainer.bind(ServerMetricsExplorerClient).toSelf();
myContainer.bind<ServerMetricsExporter>(TYPES.ServerMetricsExporter).to(ServerMetricsExplorerClient);
myContainer.bind<MonitorController>(TYPES.MonitorController).to(WsMonitorController);

// Console Command
myContainer.bind<CreateUser>(CreateUser).toSelf();

export { myContainer };
