import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {NotificationChannelType} from "../../../../../src/Domain/NotificationChannel/NotificationChannelType";

describe('test notification channel controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('should test', async () => {
        expect((await prismaClient.notification_channels.findMany()).length).toBe(0)

        // TODO: fix this test
        request(server)
            .post('/api/notification-channels/test')
            .send({
                name: 'test',
                type: NotificationChannelType.TELEGRAM.toString(),
                configurationObject: JSON.stringify({
                    token: 'test',
                    chat_id: 'test'
                }),
                isEnabled: true
            })
            .expect(202)

        expect((await prismaClient.notification_channels.findMany()).length).toBe(1)
    });
});