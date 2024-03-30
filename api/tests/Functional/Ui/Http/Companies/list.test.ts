import request = require("supertest");
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import {createCompany} from "../../../../Helper/StaticFixtures";
import {server} from "../../../../../src/Infrastructure/Http/Server";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";

describe('GET /api/companies', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

    beforeAll(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient);
    })

    it('should return a list of records', async () => {
        const company = await createCompany()

        const response = await request(server)
            .get('/api/companies')
            .expect(200)

        expect(response.body.results).toHaveLength(1)
        expect(response.body.results[0].id).toBe(company.id)
        expect(response.body.results[0].name).toBe(company.name)
        expect(response.body.results[0].is_active).toBe(company.is_active)
    });
})