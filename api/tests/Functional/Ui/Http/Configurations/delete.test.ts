import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createConfiguration} from "../../../../Helper/StaticFixtures";

describe('configurations delete controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('should delete', async () => {
        const configuration = await createConfiguration();

        expect((await prismaClient.configurations.findMany()).length).toBe(1)

        request(server)
            .delete('/api/configurations/'+configuration.id)
            .expect(200)

        expect((await prismaClient.configurations.findMany()).length).toBe(0)
    });
});