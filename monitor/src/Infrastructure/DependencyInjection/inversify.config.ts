import {Container} from "inversify";
import CommandHandlerManager from "../CommandHandler/CommandHandlerManager";
import {TYPES} from "../../Domain/DependencyInjection/types";
import CommandHandler from "../../Domain/Command/CommandHandler";
import EventDispatcher from "../../Application/Event/EventDispatcher";
import PingHealthcheckCommandHandler from "../../Application/Healthchecker/Ping/PingHealthcheckCommandHandler";
import ApiClient from "../../Domain/ApiClient";
import {HttpApiClient} from "../Api/HttpApiClient";
import TedcryptoApiClient from "../Api/Tedcrypto/TedcryptoApiClient";
import CheckDiskSpaceCommandHandler from "../../Application/Monitor/CheckDiskSpace/CheckDiskSpaceCommandHandler";
import {AlertChannel} from "../../Domain/Alerter/AlertChannel";
import {Telegram} from "../../AlertChannel/telegram";
import Alerter from "../../Domain/Alerter/Alerter";
import AppAlerter from "../Alerter/AppAlerter";
import EventHandler from "../../Domain/Event/EventHandler";
import {EventDispatcher as EventDispatcherInterface } from "../../Domain/Event/EventDispatcher";
import RunCheckFailedHandler from "../../Application/Event/Monitor/RunCheckFailedHandler";
import {WebSocketServer as WebsocketServerInterface} from "../../Domain/Server/WebSocketServer";
import WsWebSocketServer from "../Server/WsWebSocketServer";
import MonitorManager from "../../Application/Monitor/MonitorManager";
import MonitorCheckerFactory from "../../Application/Monitor/MonitorCheckerFactory";
import {MonitorCheckerFactory as MonitorCheckerFactoryInterface} from "../../Domain/Monitor/MonitorCheckerFactory";
import CheckUrlCommandHandler from "../../Application/Monitor/CheckUrl/CheckUrlCommandHandler";

const myContainer = new Container();

// Command handlers
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(PingHealthcheckCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(CheckDiskSpaceCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(CheckUrlCommandHandler);
myContainer.bind<CommandHandlerManager>(CommandHandlerManager).toSelf();

// Alerter
myContainer.bind<AlertChannel>(TYPES.AlertChannel).to(Telegram);
myContainer.bind(AppAlerter).toSelf();
myContainer.bind<Alerter>(TYPES.Alerter).to(AppAlerter);

// Services
myContainer.bind(TedcryptoApiClient).toConstantValue(new TedcryptoApiClient(process.env.API_HOST ?? ''));
myContainer.bind(HttpApiClient).toSelf()
myContainer.bind<ApiClient>(TYPES.ApiClient).to(HttpApiClient);

myContainer.bind<MonitorCheckerFactoryInterface>(TYPES.MonitorCheckerFactory).to(MonitorCheckerFactory);
myContainer.bind(MonitorManager).toSelf();
myContainer.bind<WebsocketServerInterface>(TYPES.WebSocketServer).toConstantValue(new WsWebSocketServer(8081));

// Events
myContainer.bind<EventHandler>(TYPES.EventHandler).to(RunCheckFailedHandler);
myContainer.bind(EventDispatcher).toSelf();
myContainer.bind<EventDispatcherInterface>(TYPES.EventDispatcher).to(EventDispatcher);

// Console Command

export { myContainer };
