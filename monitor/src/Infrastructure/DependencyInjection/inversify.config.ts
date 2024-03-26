import {Container} from "inversify";
import CommandHandlerManager from "../CommandHandler/CommandHandlerManager";
import {TYPES} from "../../Domain/DependencyInjection/types";
import CommandHandler from "../../Domain/Command/CommandHandler";
import EventDispatcher from "../../Application/Event/EventDispatcher";
import PingHealthcheckCommandHandler from "../../Application/Healthchecker/Ping/PingHealthcheckCommandHandler";
import ApiClient from "../../Domain/ApiClient";
import {HttpApiClient} from "../Api/HttpApiClient";
import TedcryptoApiClient from "../Api/Tedcrypto/TedcryptoApiClient";
import CheckDiskSpaceCommandHandler from "../../Application/Monitor/Check/CheckDiskSpace/CheckDiskSpaceCommandHandler";
import {AlertChannel} from "../../Domain/Alerter/AlertChannel";
import {Telegram} from "../../AlertChannel/telegram";
import Alerter from "../../Domain/Alerter/Alerter";
import AppAlerter from "../Alerter/AppAlerter";
import EventHandler from "../../Domain/Event/EventHandler";

const myContainer = new Container();

// Command handlers
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(PingHealthcheckCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(CheckDiskSpaceCommandHandler);
myContainer.bind<CommandHandlerManager>(CommandHandlerManager).toSelf();

// Alerter
myContainer.bind<AlertChannel>(TYPES.AlertChannel).to(Telegram);
myContainer.bind(AppAlerter).toSelf();
myContainer.bind<Alerter>(TYPES.Alerter).to(AppAlerter);

// Services
myContainer.bind(TedcryptoApiClient).toConstantValue(new TedcryptoApiClient(process.env.API_HOST ?? ''));
myContainer.bind(HttpApiClient).toSelf()
myContainer.bind<ApiClient>(TYPES.ApiClient).to(HttpApiClient);

// Events
//myContainer.bind<EventHandler>(TYPES.EventHandler).to();
//myContainer.bind<EventDispatcher>(EventDispatcher).toSelf();

// Console Command

export { myContainer };
