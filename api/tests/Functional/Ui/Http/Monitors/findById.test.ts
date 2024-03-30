import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createMonitor} from "../../../../Helper/StaticFixtures";

describe('Monitors find by id controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('find it', async () => {
        const monitor1 = await createMonitor();

        const result = await request(server)
            .get(`/api/monitors/${monitor1.id}`)
            .expect(200)

        expect(result.body.id).toBe(monitor1.id)
        expect(result.body.name).toBe(monitor1.name)
        expect(result.body.is_enabled).toBe(monitor1.isEnabled)
    });
});
