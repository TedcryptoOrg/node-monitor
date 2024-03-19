import {ApiConfiguration} from "./ApiConfiguration";
import {ApiMonitor} from "./ApiMonitor";
import {ApiServer} from "./ApiServer";

export type ApiAudit = {
    id: number
    configuration: ApiConfiguration,
    monitor: ApiMonitor,
    server: ApiServer,
    message: string
    created_at: string
}