import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createServer} from "../../../../Helper/StaticFixtures";

describe('Server delete controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('should delete', async () => {
        const server1 = await createServer();

        expect((await prismaClient.servers.findMany()).length).toBe(1)

        await request(server)
            .delete('/api/servers/'+server1.id)
            .expect(200)

        expect((await prismaClient.servers.findMany()).length).toBe(0)
    });
});