import NotificationChannelRepository from "../../../Domain/NotificationChannel/NotificationChannelRepository";
import NotificationChannel, {NotificationChannelArray} from "../../../Domain/NotificationChannel/NotificationChannel";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";

@injectable()
export default class OrmNotificationChannel implements NotificationChannelRepository {
    constructor(
        @inject(TYPES.OrmClient) private ormClient: PrismaClient
    ) {
    }

    async get(id: number): Promise<NotificationChannel> {
        const notificationChannel = await this.ormClient.notification_channels.findUnique({
            where: {
                id: id
            }
        });

        if (!notificationChannel) {
            throw new Error("NotificationChannel not found");
        }

        return NotificationChannel.fromArray(notificationChannel as NotificationChannelArray);
    }

    async findAll(isEnabled?: boolean): Promise<NotificationChannel[]> {
        const notificationChannels = await this.ormClient.notification_channels.findMany({
            where: {
                is_enabled: isEnabled
            }
        });

        return notificationChannels.map(
            notificationChannel => NotificationChannel.fromArray(notificationChannel as NotificationChannelArray)
        );
    }

    async upsert(notificationChannel: NotificationChannel): Promise<NotificationChannel> {
        const upsertedNotificationChannel = await this.ormClient.notification_channels.upsert({
            where: {
                id: notificationChannel.id
            },
            update: {
                name: notificationChannel.name,
                type: notificationChannel.type,
                is_enabled: notificationChannel.isEnabled,
                updated_at: new Date()
            },
            create: {
                name: notificationChannel.name,
                type: notificationChannel.type.toString(),
                configuration_object: notificationChannel.toArray().configuration_object,
                is_enabled: notificationChannel.isEnabled,
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        return NotificationChannel.fromArray(upsertedNotificationChannel as NotificationChannelArray);
    }

    async delete(id: number): Promise<void> {
        await this.ormClient.notification_channels.delete({
            where: {
                id: id
            }
        });
    }
}