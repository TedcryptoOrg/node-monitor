import request = require("supertest");
import {Response} from 'supertest';
import {server} from "../../../../../src/Infrastructure/Http/Server";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import {createCompany} from "../../../../Helper/StaticFixtures";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";

describe('GET /api/companies/:id', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    });

    it('should return the record', async () => {
        const company = await createCompany();

        // Send request
        const response: Response = await request(server)
            .get('/api/companies/' + company.id)

        expect(response.status).toEqual(200);

        // Assert
        expect(response.body.id).toBe(company.id)
        expect(response.body.name).toBe(company.name)
        expect(response.body.is_active).toBe(company.is_active)
    });
});