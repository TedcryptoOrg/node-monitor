import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createConfiguration, createMonitor, createServer, createService} from "../../../../Helper/StaticFixtures";

describe('servers find all services controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('find all', async () => {
        const server1 = await createServer()
        const service1 = await createService(server1)
        const service2 = await createService(server1)

        const result = await request(server)
            .get('/api/servers/' + server1.id + '/services')
            .expect(200)

        expect(result.body.length).toBe(2)
        expect(result.body[0].id).toBe(service1.id)
        expect(result.body[1].id).toBe(service2.id)
    });
});