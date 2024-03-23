import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createConfiguration, createNotificationChannel, createServer} from "../../../../Helper/StaticFixtures";

describe('servers find all controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('find all', async () => {
        const server1 = await createServer();
        const server2 = await createServer();

        const result = await request(server)
            .get('/api/servers')
            .expect(200)

        expect(result.body.length).toBe(2)
        expect(result.body[0].id).toBe(server1.id)
        expect(result.body[0].name).toBe(server1.name)
        expect(result.body[0].address).toBe(server1.address)
        expect(result.body[0].is_enabled).toBe(server1.isEnabled)
        expect(result.body[1].id).toBe(server2.id)
        expect(result.body[1].name).toBe(server2.name)
        expect(result.body[1].address).toBe(server2.address)
        expect(result.body[1].is_enabled).toBe(server2.isEnabled)
    });
});
