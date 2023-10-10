import request = require("supertest");
import * as configurationDal from "../../../../src/database/dal/configuration";
import * as monitorDal from "../../../../src/database/dal/monitor";
import {setupIntegrationTest, teardownIntegrationTest} from "../../../Helper/integrationTest";
import {server} from "../../../../src/server";

beforeAll((done) => {
    setupIntegrationTest(done);
})

afterAll((done) => {
    teardownIntegrationTest(done);
});

describe('DELETE /monitors/:id', () => {
    it('should delete monitor', async () => {
        const configuration = await configurationDal.create({
            name: 'test',
            chain: 'test',
            is_enabled: true
        })
        const monitor = await monitorDal.create({
            name: 'test',
            type: 'test',
            configuration_id: configuration.id,
            configuration_object: '{}',
            is_enabled: true,
        })

        expect(monitorDal.getAll()).resolves.toHaveLength(1)

        return request(server)
            .delete('/api/monitors/'+monitor.id)
            .expect(200)
            .then(() => {
                expect(monitorDal.getAll()).resolves.toHaveLength(0)
            });
    });
});