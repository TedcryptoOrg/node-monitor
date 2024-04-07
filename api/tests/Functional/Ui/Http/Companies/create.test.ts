import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import Company from "../../../../../src/Domain/User/Company";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";

describe('POST /api/companies', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    });

    it('should create a new record', async () => {
        const data = new Company(
            'name',
            true,
            []
        );

        // Send POST request
        await request(server)
            .post('/api/companies')
            .send(data)
            .expect(201);

        // Query the database
        const company = await prismaClient.company.findFirst();

        // Assert that created
        expect(company).toBeDefined();
        if (company instanceof Company) {
            expect(company.toObject()).toMatchObject(data);
        }
    });
});