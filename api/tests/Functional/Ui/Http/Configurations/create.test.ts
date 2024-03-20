import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";

describe('create configurations controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('should create a configuration', async () => {
        expect((await prismaClient.configurations.findMany()).length).toBe(0)

        request(server)
            .post('/api/configurations')
            .send({
                name: 'test',
                chain: 'test',
            })
            .expect(202)

        expect((await prismaClient.configurations.findMany()).length).toBe(1)
    });
});