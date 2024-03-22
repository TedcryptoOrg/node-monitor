import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createConfiguration} from "../../../../Helper/StaticFixtures";

describe('create server controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('should create', async () => {
        const configuration = await createConfiguration()

        expect((await prismaClient.servers.findMany()).length).toBe(0)

        await request(server)
            .post('/api/servers')
            .send({
                name: 'test',
                address: 'http://localhost',
                is_enabled: true,
                configuration_id: configuration.id
            })
            .expect(202)

        expect((await prismaClient.servers.findMany()).length).toBe(1)
    });
});