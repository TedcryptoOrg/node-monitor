import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createConfiguration, createNotificationChannel} from "../../../../Helper/StaticFixtures";

describe('notification channel get by id controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('get by id', async () => {
        const notificationChannel = await createNotificationChannel();

        const result = await request(server)
            .get('/api/notification-channels/'+notificationChannel.id)
            .expect(200)

        expect(result.body.id).toBe(notificationChannel.id)
        expect(result.body.name).toBe(notificationChannel.name)
        expect(result.body.is_enabled).toBe(true)
    });
});