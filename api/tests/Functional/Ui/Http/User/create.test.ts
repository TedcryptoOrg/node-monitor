import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import User from "../../../../../src/Domain/User/User";
import {createCompany} from "../../../../Helper/StaticFixtures";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";

describe('POST /api/users', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    });

    it('should create a new record', async () => {
        const data = {
            username: 'name',
            is_active: true,
            is_admin: false,
            is_super_admin: false,
            company_id: (await createCompany()).id,
            raw_password: 'password'
        };

        // Send POST request
        await request(server)
            .post('/api/users')
            .send(data)
            .expect(201);

        // Query the database
        const user = await prismaClient.user.findFirst();

        // Assert that created
        expect(user).toBeDefined();
        if (user instanceof User) {
            expect(user.toObject()).toMatchObject(data);
        }
    });
});