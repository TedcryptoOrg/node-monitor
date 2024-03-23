import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createMonitor} from "../../../../Helper/StaticFixtures";

describe('Monitors find all controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('find all', async () => {
        const monitor1 = await createMonitor();
        const monitor2 = await createMonitor();

        const result = await request(server)
            .get('/api/monitors')
            .expect(200)

        expect(result.body.length).toBe(2)
        expect(result.body[0].id).toBe(monitor1.id)
        expect(result.body[0].name).toBe(monitor1.name)
        expect(result.body[0].is_enabled).toBe(monitor1.isEnabled)
        expect(result.body[1].id).toBe(monitor2.id)
        expect(result.body[1].name).toBe(monitor2.name)
        expect(result.body[1].is_enabled).toBe(monitor2.isEnabled)
    });
});
