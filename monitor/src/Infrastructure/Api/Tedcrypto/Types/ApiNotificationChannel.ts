import {NotificationChannelTypeEnum} from "./NotificationChannelType";

export type ApiNotificationChannel = {
    id: number,
    type: NotificationChannelTypeEnum,
    name: string,
    configuration_object: object,
    is_enabled: boolean,
    created_at?: Date,
    updated_at?: Date,
}