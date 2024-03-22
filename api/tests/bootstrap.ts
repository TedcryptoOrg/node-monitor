import * as dotenv from 'dotenv';
import path = require("path");
import {myContainer} from "../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../src/Domain/DependencyInjection/types";
import ServerMetricsExporter from "../src/Domain/Server/ServerMetricsExporter";
import InMemoryServerMetricsExporter from "./Helper/InMemoryServerMetricsExporter";

dotenv.config({
    path: path.join(__dirname, '/../.env.test'),
    debug: true
})

myContainer.bind<ServerMetricsExporter>(TYPES.ServerMetricsExporter).to(InMemoryServerMetricsExporter);
