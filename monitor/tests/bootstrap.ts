import * as dotenv from 'dotenv';
import path = require("path");
import {myContainer} from "../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../src/Domain/DependencyInjection/types";
import InMemoryHttpApiClient from "./Helper/InMemoryHttpApiClient";
import SpyEventDispatcher from "./Helper/SpyEventDispatcher";
import EventDispatcher from "../src/Application/Event/EventDispatcher";
import StubWebSocketServer from "./Helper/Monitor/StubWebSocketServer";
import InMemoryBlockchainClientFactory from "./Helper/Blockchain/InMemoryBlockchainClientFactory";

dotenv.config({
    path: path.join(__dirname, '/../.env.test'),
    debug: true
})

myContainer.rebind(TYPES.ApiClient).toConstantValue(new InMemoryHttpApiClient());
myContainer.rebind(TYPES.EventDispatcher).toConstantValue(new SpyEventDispatcher(myContainer.get(EventDispatcher)));
myContainer.rebind(TYPES.WebSocketServer).toConstantValue(new StubWebSocketServer());
myContainer.rebind(TYPES.BlockchainClientFactory).toConstantValue(new InMemoryBlockchainClientFactory())
