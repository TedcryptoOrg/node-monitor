import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createMonitor, createServer} from "../../../../Helper/StaticFixtures";

describe('Monitor delete controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('should delete', async () => {
        const monitor = await createMonitor();

        expect((await prismaClient.monitors.findMany()).length).toBe(1)

        request(server)
            .delete('/api/monitors/'+monitor.id)
            .expect(200)

        expect((await prismaClient.monitors.findMany()).length).toBe(0)
    });
});