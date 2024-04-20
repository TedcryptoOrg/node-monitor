import {ApiServer} from "./ApiServer";
import {ApiMonitor} from "./ApiMonitor";
import {ApiNotificationChannel} from "./ApiNotificationChannel";
import {ApiConfigurationNotificationChannel} from "./ApiConfigurationNotificationChannel";

export type ApiConfiguration = {
    id: number
    name: string
    chain: string
    is_enabled: boolean
    createdAt: string
    updatedAt: string
    servers: ApiServer[]|undefined
    monitors: ApiMonitor[]|undefined
    notification_channels: ApiConfigurationNotificationChannel[]|undefined
}
