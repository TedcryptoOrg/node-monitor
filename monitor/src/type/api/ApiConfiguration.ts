import {ApiServer} from "./ApiServer";
import {ApiMonitor} from "./ApiMonitor";

export type ApiConfiguration = {
    id: number
    name: string
    chain: string
    is_enabled: boolean
    createdAt: string
    updatedAt: string
    servers: ApiServer[]|undefined
    monitors: ApiMonitor[]|undefined
}