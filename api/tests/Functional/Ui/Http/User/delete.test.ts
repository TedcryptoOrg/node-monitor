import request = require("supertest");
import {createUser} from "../../../../Helper/StaticFixtures";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {PrismaClient} from "@prisma/client";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";

describe('DELETE /api/users/:id', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

    beforeAll(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient);
    })

    it('should delete a record', async () => {
        const user = await createUser();

        expect((await prismaClient.user.findMany()).length).toBe(1);

        // Send DELETE request
        await request(server)
            .delete('/api/users/' + user.id)
            .expect(200);

        // Assert
        expect((await prismaClient.user.findMany()).length).toBe(0);
    });
})