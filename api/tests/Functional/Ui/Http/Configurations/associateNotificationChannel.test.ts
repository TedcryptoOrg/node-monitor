import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createConfiguration, createNotificationChannel} from "../../../../Helper/StaticFixtures";

describe('configurations associate controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('associate', async () => {
        const configuration = await createConfiguration();
        const notificationChannel = await createNotificationChannel();

        const result = await request(server)
            .post('/api/configurations/'+configuration.id+'/notification-channels')
            .send({
                configuration_id: configuration.id,
                notification_channel_id: notificationChannel.id
            })
            .expect(200)

        expect(result.body.id).toBeDefined()
        expect(result.body.configuration.id).toBe(configuration.id)
        expect(result.body.notification_channel.id).toBe(notificationChannel.id)
    });
});