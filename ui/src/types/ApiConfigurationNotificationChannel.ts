import {ApiNotificationChannel} from "./ApiNotificationChannel";

export interface ApiConfigurationNotificationChannelInput {
    configuration_id: number,
    notification_channel_id: number,
}

export interface ApiConfigurationNotificationChannel {
    id: number
    notification_channel: ApiNotificationChannel
}
