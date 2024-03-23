import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createMonitor} from "../../../../Helper/StaticFixtures";

describe('Monitor ping controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('should ping', async () => {
        const monitor = await createMonitor();

        await assertStatus(true)
        await assertLastError(null)

        const response = await request(server)
            .post('/api/monitors/'+monitor.id+'/ping')
            .send({
                status: 'false', // TODO: fix-me . should be boolean
                last_error: 'test error'
            })
        console.log(response.body)
        expect(response.status).toBe(202)

        await assertStatus(false)
        await assertLastError('test error')

        // clear status

        await request(server)
            .post('/api/monitors/'+monitor.id+'/ping')
            .send({
                status: true,
                last_error: null
            })
            .expect(202)

        await assertStatus(true)
        await assertLastError(null)
    });

    const assertStatus = async (status: boolean) => {
        const monitor = await prismaClient.monitors.findFirst({})
        expect(monitor?.status).toBe(status)
    }

    const assertLastError = async (lastError: string|null) => {
        const monitor = await prismaClient.monitors.findFirst({})
        expect(monitor?.last_error).toBe(lastError)
    }
});