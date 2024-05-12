import { Container } from 'inversify'
import CommandHandlerManager from '../CommandHandler/CommandHandlerManager'
import { TYPES } from '../../Domain/DependencyInjection/types'
import EventDispatcher from '../../Application/Event/EventDispatcher'
import PingHealthcheckCommandHandler from '../../Application/Healthchecker/Ping/PingHealthcheckCommandHandler'
import type ApiClient from '../../Domain/ApiClient'
import { HttpApiClient } from '../Api/HttpApiClient'
import TedcryptoApiClient from '../Api/Tedcrypto/TedcryptoApiClient'
import CheckDiskSpaceCommandHandler from '../../Application/Monitor/CheckDiskSpace/CheckDiskSpaceCommandHandler'
import { type EventDispatcher as EventDispatcherInterface } from '../../Domain/Event/EventDispatcher'
import RunCheckFailedHandler from '../../Application/Event/Monitor/RunCheckFailedHandler'
import { type WebSocketServer as WebsocketServerInterface } from '../../Domain/Server/WebSocketServer'
import WsWebSocketServer from '../Server/WsWebSocketServer'
import MonitorManager from '../../Application/Monitor/MonitorManager'
import MonitorCheckerFactory from '../../Application/Monitor/MonitorCheckerFactory'
import { type MonitorCheckerFactory as MonitorCheckerFactoryInterface } from '../../Domain/Monitor/MonitorCheckerFactory'
import CheckUrlCommandHandler from '../../Application/Monitor/CheckUrl/CheckUrlCommandHandler'
import type BlockchainClientFactory from '../../Domain/Blockchain/BlockchainClientFactory'
import CosmosBlockchainClientFactory from '../Blockchain/Cosmos/CosmosBlockchainClientFactory'
import CheckSignMissCommandHandler from '../../Application/Monitor/CheckSignMiss/CheckSignMissCommandHandler'
import CheckBlockCommandHandler from '../../Application/Monitor/CheckBlock/CheckBlockCommandHandler'
import CheckOracleSignMissCommandHandler
  from '../../Application/Monitor/CheckOracleSignMiss/CheckOracleSignMissCommandHandler'
import { type HttpClient } from '../../Domain/Http/HttpClient'
import AxiosHttpClient from '../Http/AxiosHttpClient'
import CheckStatusChangedHandler from '../../Application/Event/Monitor/CheckStatusChangedHandler'
import LoggerManager from '../../Application/Logger/LoggerManager'
import type Logger from '../../Application/Logger/Logger'
import WebsocketLogProvider from '../Logger/WebsocketLogProvider'
import ConsoleLogProvider from '../Logger/ConsoleLogProvider'
import LokiLogProvider from '../Logger/LokiLogProvider'
import { isEmpty } from '../../Application/Shared/StringTools'

const myContainer = new Container()

// Websocket
myContainer.bind<WebsocketServerInterface>(TYPES.WebSocketServer).toConstantValue(new WsWebSocketServer(8081))

// Logger
myContainer.bind(ConsoleLogProvider).toSelf()
myContainer.bind(WebsocketLogProvider).toSelf()

const loggerManager = new LoggerManager()
loggerManager.addProvider(myContainer.get(ConsoleLogProvider))
loggerManager.addProvider(myContainer.get(WebsocketLogProvider))
if (!isEmpty(process.env.LOKI_HOST)) {
  loggerManager.addProvider(new LokiLogProvider(
    String(process.env.LOKI_HOST),
    isEmpty(process.env.LOKI_AUTH) ? undefined : String(process.env.LOKI_AUTH)
  ))
}
myContainer.bind<Logger>(TYPES.Logger).toConstantValue(loggerManager)

// Command handlers
myContainer.bind(TYPES.CommandHandler).to(PingHealthcheckCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(CheckDiskSpaceCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(CheckUrlCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(CheckSignMissCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(CheckBlockCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(CheckOracleSignMissCommandHandler)
myContainer.bind<CommandHandlerManager>(CommandHandlerManager).toSelf()

// Services
myContainer.bind<HttpClient>(TYPES.HttpClient).to(AxiosHttpClient)

myContainer.bind(TedcryptoApiClient).toConstantValue(new TedcryptoApiClient(process.env.API_HOST ?? ''))
myContainer.bind(HttpApiClient).toSelf()
myContainer.bind<ApiClient>(TYPES.ApiClient).to(HttpApiClient)

myContainer.bind<MonitorCheckerFactoryInterface>(TYPES.MonitorCheckerFactory).to(MonitorCheckerFactory)
myContainer.bind(MonitorManager).toSelf()

myContainer.bind(CosmosBlockchainClientFactory).toSelf()
myContainer.bind<BlockchainClientFactory>(TYPES.BlockchainClientFactory).to(CosmosBlockchainClientFactory)

// Events
myContainer.bind(TYPES.EventHandler).to(RunCheckFailedHandler)
myContainer.bind(TYPES.EventHandler).to(CheckStatusChangedHandler)
myContainer.bind(EventDispatcher).toSelf()
myContainer.bind<EventDispatcherInterface>(TYPES.EventDispatcher).to(EventDispatcher)

// Console Command

export { myContainer }
