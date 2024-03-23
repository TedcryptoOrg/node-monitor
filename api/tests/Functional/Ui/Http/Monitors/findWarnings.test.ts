import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import {createMonitor} from "../../../../Helper/StaticFixtures";
import Monitor from "../../../../../src/Domain/Monitor/Monitor";

describe('Monitors find all warnings controller', () => {
    let prismaClient: PrismaClient
    let failed1: Monitor
    let failed2: Monitor
    let ok1: Monitor
    let ok2: Monitor
    let warning1: Monitor
    let warning2: Monitor
    let disabled1: Monitor

    beforeAll(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)

        failed1 = await createMonitor(undefined, 'failed1', undefined, false)
        failed2 = await createMonitor(undefined, 'failed2', undefined, false)
        ok1 = await createMonitor()
        ok2 = await createMonitor()
        warning1 = await createMonitor(undefined, 'warning1', undefined, true, 'warning')
        warning2 = await createMonitor(undefined, 'warning2', undefined, true, 'warning')
        disabled1 = await createMonitor(undefined, 'disabled1', false, false)
    })

    it('find all', async () => {
        const result = await request(server)
            .get('/api/monitors/warnings')
            .expect(200)

        expect(result.body.length).toBe(2)
        expect(result.body[0].id).toBe(warning1.id)
        expect(result.body[0].name).toBe(warning1.name)
        expect(result.body[1].id).toBe(warning2.id)
        expect(result.body[1].name).toBe(warning2.name)
    })

    it('use pagination', async () => {
        const result = await request(server)
            .get('/api/monitors/warnings?offset=0&limit=1')
            .expect(200)

        expect(result.body.length).toBe(1)
        expect(result.body[0].id).toBe(warning1.id)
        expect(result.body[0].name).toBe(warning1.name)

        const result2 = await request(server)
            .get('/api/monitors/warnings?offset=1&limit=1')
            .expect(200)

        expect(result2.body.length).toBe(1)
        expect(result2.body[0].id).toBe(warning2.id)
        expect(result2.body[0].name).toBe(warning2.name)
    })
});
