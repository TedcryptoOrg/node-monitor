import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import { createConfigurationNotification } from "../../../../Helper/StaticFixtures";

describe('configurations remove association controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('remove association', async () => {
        const configurationNotification = await createConfigurationNotification();

        expect((await prismaClient.configuration_notification_channels.findMany({})).length).toBe(1)

        await request(server)
            .delete('/api/configurations/'+configurationNotification.configuration?.id+'/notification-channels/'+configurationNotification.id)
            .expect(200)

        expect((await prismaClient.configuration_notification_channels.findMany({})).length).toBe(0)
    });
});