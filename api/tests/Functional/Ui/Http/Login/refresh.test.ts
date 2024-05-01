import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {PrismaClient} from "@prisma/client";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {createUser} from "../../../../Helper/StaticFixtures";
import SuperTestRequestBuilder from "../../../../Helper/SuperTestRequestBuilder";
import SecurityProvider from "../../../../../src/Domain/Security/SecurityProvider";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";

const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

describe('Post /api/refresh', () => {
    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('200', async () => {
        const user = await createUser();
        const accessTokens = myContainer.get<SecurityProvider>(TYPES.SecurityProvider).generateTokens(user);

        const response = await SuperTestRequestBuilder
            .post('/api/refresh')
            .withAuthenticationToken(accessTokens.refreshToken.token)
            .build();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body.accessToken.value).not.toBe(accessTokens.accessToken.token);
        expect(response.body).toHaveProperty('refreshToken');
        expect(response.body.refreshToken.value).not.toBe(accessTokens.refreshToken.token);
    });
});