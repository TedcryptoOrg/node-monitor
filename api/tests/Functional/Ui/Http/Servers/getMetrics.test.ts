import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import {PrismaClient} from "@prisma/client";
import {createServer, createService} from "../../../../Helper/StaticFixtures";
import InMemoryServerMetricsExporter from "../../../../Helper/InMemoryServerMetricsExporter";
import {ServiceType} from "../../../../../src/Domain/Service/ServiceType";

describe('servers get metrics controller', () => {
    let prismaClient: PrismaClient

    beforeEach(async () => {
        prismaClient = myContainer.get(TYPES.OrmClient)
        await DatabaseUtil.truncateAllTables(prismaClient)

        myContainer.get<InMemoryServerMetricsExporter>(TYPES.ServerMetricsExporter).addMetrics(
            'http://localhost:9100/metrics',
            {
                freeDiskSpace: 1000,
                usedDiskSpace: 200,
                totalDiskSpace: 2000,
                usedDiskSpacePercentage: 10,
                memoryUsage: 320,
                memoryUsagePercentage: 80,
                totalMemory: 400
            }
        )

    })

    it('get metrics', async () => {
        const server1 = await createServer();
        const nodeExporter = await createService(server1, ServiceType.NODE_EXPORTER, 'http://localhost:9100/metrics')

        const result = await request(server)
            .get('/api/servers/'+server1.id+'/metrics')
            .expect(200)

        expect(result.body).toEqual({
            freeDiskSpace: 1000,
            usedDiskSpace: 200,
            totalDiskSpace: 2000,
            usedDiskSpacePercentage: 10,
            memoryUsage: 320,
            memoryUsagePercentage: 80,
            totalMemory: 400
        })
    });
});