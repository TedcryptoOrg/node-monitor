import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createConfiguration} from "../../../../Helper/StaticFixtures";
import {MonitorType} from "../../../../../src/Domain/Monitor/MonitorType";
import InMemoryMonitorController from "../../../../Helper/InMemoryMonitorController";

describe('create monitor controller', () => {
    let prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient)
    let monitorController: InMemoryMonitorController = myContainer.get(TYPES.MonitorController)

    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('should create', async () => {
        expect((await prismaClient.monitors.findMany()).length).toBe(0)

        await request(server)
            .post('/api/monitors')
            .send({
                name: 'test monitor',
                type: MonitorType.BLOCK_CHECK,
                configuration_id: (await createConfiguration()).id,
                configuration_object: '{}'
            })
            .expect(202)

        expect((await prismaClient.monitors.findMany()).length).toBe(1)
        expect(monitorController.hasMonitorBeenUpdated(1)).toBe(true)
        expect(monitorController.hasMonitorBeenEnabled(1)).toBe(true)
        expect(monitorController.hasMonitorBeenDisabled(1)).toBe(false)
    });
});