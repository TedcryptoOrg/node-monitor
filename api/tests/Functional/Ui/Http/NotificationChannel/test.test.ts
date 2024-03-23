import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import {PrismaClient} from "@prisma/client";
import {NotificationChannelType} from "../../../../../src/Domain/NotificationChannel/NotificationChannelType";
import InMemoryNotificationClientFactory
    from "../../../../Helper/NotificationChannel/InMemoryNotificationClientFactory";
import InMemoryNotificationClient from "../../../../Helper/NotificationChannel/InMemoryNotificationClient";

describe('test notification channel controller', () => {
    let prismaClient: PrismaClient
    let inMemoryClient: InMemoryNotificationClient

    beforeEach(async () => {
        inMemoryClient = new InMemoryNotificationClient()
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)

        myContainer.get<InMemoryNotificationClientFactory>(TYPES.NotificationChannelClientFactory)
            .addClient(NotificationChannelType.TELEGRAM, inMemoryClient)
    })

    it('should test', async () => {
        await request(server)
            .post('/api/notification-channels/test')
            .send({
                name: 'test',
                type: NotificationChannelType.TELEGRAM.toString(),
                configuration_object: JSON.stringify({
                    token: 'test',
                    chat_id: 'test'
                }),
                is_enabled: true
            })
            .expect(200)

        expect(inMemoryClient.getSentMessages()).toEqual(['Test test notification channel successful!'])
    });
});