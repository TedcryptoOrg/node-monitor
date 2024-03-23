import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createConfiguration, createMonitor} from "../../../../Helper/StaticFixtures";

describe('configurations find all monitors controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('find all', async () => {
        const configuration = await createConfiguration()
        const monitor1 = await createMonitor(configuration)
        const monitor2 = await createMonitor(configuration)

        const result = await request(server)
            .get('/api/configurations/' + configuration.id + '/monitors')
            .expect(200)

        expect(result.body.length).toBe(2)
        expect(result.body[0].id).toBe(monitor1.id)
        expect(result.body[1].id).toBe(monitor2.id)
    });
});