import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {
    createConfiguration,
    createConfigurationNotification,
    createMonitor,
    createNotificationChannel
} from "../../../../Helper/StaticFixtures";

describe('configurations find all notification channels controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('find all', async () => {
        const configurationNotification = await createConfigurationNotification()

        const result = await request(server)
            .get('/api/configurations/' + configurationNotification.configuration.id + '/notification-channels')
            .expect(200)

        expect(result.body.length).toBe(1)
        expect(result.body[0].configuration.id).toBe(configurationNotification.configuration.id)
        expect(result.body[0].notification_channel.id).toBe(configurationNotification.notificationChannel.id)
    });
});