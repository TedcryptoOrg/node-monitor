import {Response} from 'supertest';
import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import {createUser} from "../../../../Helper/StaticFixtures";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";

describe('GET /api/users/:id', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    });

    it('should return the record', async () => {
        const user = await createUser();

        // Send request
        const response: Response = await request(server)
            .get('/api/users/' + user.id)

        expect(response.status).toEqual(200);

        // Assert
        expect(response.body.id).toBe(user.id)
        expect(response.body.username).toBe(user.username)
        expect(response.body.password).not.toBeDefined()

    });
});