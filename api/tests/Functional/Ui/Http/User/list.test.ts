import request = require("supertest");
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import {createUser,} from "../../../../Helper/StaticFixtures";
import {server} from "../../../../../src/Infrastructure/Http/Server";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";

describe('GET /api/users', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

    beforeAll(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient);
    })

    it('should return a list of records', async () => {
        const user = await createUser()

        const response = await request(server)
            .get('/api/users')
            .expect(200)

        expect(response.body.results).toHaveLength(1)
        expect(response.body.results[0].id).toBe(user.id)
        expect(response.body.results[0].username).toBe(user.username)
        expect(response.body.results[0].is_active).toBe(user.is_active)
        expect(response.body.results[0].is_admin).toBe(user.is_admin)
        expect(response.body.results[0].is_super_admin).toBe(user.is_super_admin)
        expect(response.body.results[0].company.id).toBe(1)
        expect(response.body.results[0].company.name).toBe('test akash')
    });
})