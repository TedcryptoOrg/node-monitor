import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {PrismaClient} from "@prisma/client";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {createUser} from "../../../../Helper/StaticFixtures";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";

describe('Post /api/login', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('should return 200 and a token when login is successful', async () => {
        const user = await createUser();

        const response = await request(server)
            .post('/api/login')
            .send({
                username: 'test@example.com',
                password: 'password',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('refreshToken');
    });

    it('should return 404 when email is not found', async () => {
        const response = await request(server)
            .post('/api/login')
            .send({
                username: 'notfound@example.com', // replace with an email that doesn't exist
                password: 'password123',
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({message: 'User not found'});
    });

    it('should return 404 when password is incorrect', async () => {
        await createUser();

        const response = await request(server)
            .post('/api/login')
            .send({
                username: 'test@example.com',
                password: 'wrongpassword',
            });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({message: 'Incorrect password'});
    });
});