import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createServer} from "../../../../Helper/StaticFixtures";
import {ServiceType} from "../../../../../src/Domain/Service/ServiceType";

describe('services - upsert controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('should create', async () => {
        const server1 = await createServer()

        expect((await prismaClient.services.findMany()).length).toBe(0)

        await request(server)
            .post('/api/services')
            .send({
                name: 'test',
                address: 'http://localhost',
                is_enabled: true,
                type: ServiceType.RPC,
                server_id: server1.id
            })
            .expect(202)

        expect((await prismaClient.services.findMany()).length).toBe(1)
    });
});