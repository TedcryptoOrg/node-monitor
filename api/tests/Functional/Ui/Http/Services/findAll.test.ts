import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createService} from "../../../../Helper/StaticFixtures";

describe('services find all controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('find all', async () => {
        const service1 = await createService();
        const service2 = await createService();

        const result = await request(server)
            .get('/api/services')
            .expect(200)

        expect(result.body.length).toBe(2)
        expect(result.body[0].id).toBe(service1.id)
        expect(result.body[0].name).toBe(service1.name)
        expect(result.body[0].address).toBe(service1.address)
        expect(result.body[0].is_enabled).toBe(service1.isEnabled)
        expect(result.body[1].id).toBe(service2.id)
        expect(result.body[1].name).toBe(service2.name)
        expect(result.body[1].address).toBe(service2.address)
        expect(result.body[1].is_enabled).toBe(service2.isEnabled)
    });
});
