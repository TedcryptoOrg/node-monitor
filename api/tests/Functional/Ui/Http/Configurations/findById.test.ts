import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createConfiguration} from "../../../../Helper/StaticFixtures";

describe('configurations find by id controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('find by id', async () => {
        const configuration = await createConfiguration();

        const result = await request(server)
            .get('/api/configurations/'+configuration.id)
            .expect(200)

        expect(result.body.id).toBe(configuration.id)
        expect(result.body.name).toBe(configuration.name)
        expect(result.body.chain).toBe(configuration.chain)
        expect(result.body.is_enabled).toBe(true)
        expect(result.body.servers).toStrictEqual([])
        expect(result.body.monitors).toStrictEqual([])
    });
});