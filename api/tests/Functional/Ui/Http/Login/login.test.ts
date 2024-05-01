import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {PrismaClient} from "@prisma/client";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {createUser} from "../../../../Helper/StaticFixtures";
import SuperTestRequestBuilder from "../../../../Helper/SuperTestRequestBuilder";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";

const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

describe('Post /api/login', () => {
    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('should return 200 and a token when login is successful', async () => {
        await createUser();

        const response = await SuperTestRequestBuilder
            .post('/api/login')
            .withData({
                username: 'test@example.com',
                password: 'password',
            })
            .build();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('refreshToken');
    });

    it('should return 404 when email is not found', async () => {
        const response = await SuperTestRequestBuilder
            .post('/api/login')
            .withData({
                username: 'notfound@example.com', // replace with an email that doesn't exist
                password: 'password123',
            })
            .build();

        expect(response.status).toBe(401);
        expect(response.body).toEqual({message: 'Username or password is incorrect'});
    });

    it('should return 404 when password is incorrect', async () => {
        await createUser();

        const response = await SuperTestRequestBuilder
            .post('/api/login')
            .withData({
                username: 'test@example.com',
                password: 'wrongpassword',
            })
            .build();

        expect(response.status).toBe(401);
        expect(response.body).toEqual({message: 'Username or password is incorrect'});
    });
});