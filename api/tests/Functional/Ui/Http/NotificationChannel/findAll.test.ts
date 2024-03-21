import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createConfiguration, createNotificationChannel} from "../../../../Helper/StaticFixtures";

describe('notification channel find all controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('find all', async () => {
        const notificationChannel1 = await createNotificationChannel();
        const notificationChannel2 = await createNotificationChannel();

        const result = await request(server)
            .get('/api/notification-channels/')
            .expect(200)

        expect(result.body.length).toBe(2)
        expect(result.body[0].id).toBe(notificationChannel1.id)
        expect(result.body[0].name).toBe(notificationChannel1.name)
        expect(result.body[0].is_enabled).toBe(notificationChannel1.isEnabled)
        expect(result.body[1].id).toBe(notificationChannel2.id)
        expect(result.body[1].name).toBe(notificationChannel2.name)
        expect(result.body[1].is_enabled).toBe(notificationChannel2.isEnabled)
    });

    it('only active', async () => {
        const notificationChannel1 = await createNotificationChannel();
        await createNotificationChannel(undefined, false);

        const result = await request(server)
            .get('/api/notification-channels/?only_active=true')
            .expect(200)

        expect(result.body.length).toBe(1)
        expect(result.body[0].id).toBe(notificationChannel1.id)
        expect(result.body[0].name).toBe(notificationChannel1.name)
        expect(result.body[0].is_enabled).toBe(true)
    });
});