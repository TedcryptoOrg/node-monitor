import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import { createServer } from "../../../../Helper/StaticFixtures";

describe('servers get by id controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('get by id', async () => {
        const server1 = await createServer();

        const result = await request(server)
            .get('/api/servers/'+server1.id)
            .expect(200)

        expect(result.body.id).toBe(server1.id)
        expect(result.body.name).toBe(server1.name)
        expect(result.body.address).toBe(server1.address)
        expect(result.body.is_enabled).toBe(server1.isEnabled)
    });
});