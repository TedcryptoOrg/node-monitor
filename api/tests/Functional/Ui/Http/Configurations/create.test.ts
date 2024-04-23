import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import {PrismaClient} from "@prisma/client";
import InMemoryMonitorController from "../../../../Helper/InMemoryMonitorController";

describe('create configurations controller', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient)
    const monitorController: InMemoryMonitorController = myContainer.get(TYPES.MonitorController)

    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('should create a configuration', async () => {
        expect((await prismaClient.configurations.findMany()).length).toBe(0)

        await request(server)
            .post('/api/configurations')
            .send({
                name: 'test',
                chain: 'test',
                is_enabled: true
            })
            .expect(202)

        expect((await prismaClient.configurations.findMany()).length).toBe(1)
        expect(monitorController.hasConfigurationBeenEnabled(1)).toBe(true)
    });
});