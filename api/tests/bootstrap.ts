import * as dotenv from 'dotenv';
import path = require("path");
import {myContainer} from "../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../src/Domain/DependencyInjection/types";
import ServerMetricsExporter from "../src/Domain/Server/ServerMetricsExporter";
import InMemoryServerMetricsExporter from "./Helper/InMemoryServerMetricsExporter";
import InMemoryNotificationClientFactory from "./Helper/NotificationChannel/InMemoryNotificationClientFactory";
import NotificationChannelClientFactory from "../src/Domain/NotificationChannel/Client/NotificationChannelClientFactory";

dotenv.config({
    path: path.join(__dirname, '/../.env.test'),
    debug: true
})

myContainer.rebind<ServerMetricsExporter>(TYPES.ServerMetricsExporter).toConstantValue(new InMemoryServerMetricsExporter());
myContainer.rebind<NotificationChannelClientFactory>(TYPES.NotificationChannelClientFactory).toConstantValue(new InMemoryNotificationClientFactory());
