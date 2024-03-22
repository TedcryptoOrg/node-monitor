import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createConfiguration, createMonitor, createServer} from "../../../../Helper/StaticFixtures";

describe('configurations find all servers controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('find all', async () => {
        const configuration = await createConfiguration()
        const server1 = await createServer(configuration)
        const server2 = await createServer(configuration)

        const result = await request(server)
            .get('/api/configurations/' + configuration.id + '/servers')
            .expect(200)

        expect(result.body.length).toBe(2)
        expect(result.body[0].id).toBe(server1.id)
        expect(result.body[1].id).toBe(server2.id)
    });
});