import {Response} from 'supertest';
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import {createUser} from "../../../../Helper/StaticFixtures";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import SuperTestRequestBuilder from "../../../../Helper/SuperTestRequestBuilder";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";

const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

describe('GET /api/users/me', () => {
    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    });

    it('should return the record', async () => {
        const user = await createUser();

        const response: Response = await SuperTestRequestBuilder
            .get('/api/users/me', true)
            .withUser(user)
            .build();

        expect(response.status).toEqual(200);

        // Assert
        expect(response.body.id).toBe(user.id)
        expect(response.body.username).toBe(user.username)
        expect(response.body.password).not.toBeDefined()
    });
});