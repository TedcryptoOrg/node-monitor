import request = require("supertest");
import * as configurationDal from "../../../../src/database/dal/configuration";
import * as monitorDal from "../../../../src/database/dal/monitor";
import {setupIntegrationTest, teardownIntegrationTest} from "../../../Helper/integrationTest";
import {server} from "../../../../src/server";
import {MonitorInput} from "../../../../src/database/models/monitor";

beforeAll((done) => {
    setupIntegrationTest(done);
})

afterAll((done) => {
    teardownIntegrationTest(done);
});

describe('update servers controller', () => {
    it('should update server', async () => {
        const requestBody: MonitorInput = {
            name: 'test_updated',
            type: 'monitor_updated',
            configuration_id: 1,
            configuration_object: '{"true"}',
            is_enabled: false
        }

        const configuration = await configurationDal.create({
            name: 'test',
            chain: 'chain',
            is_enabled: true
        })
        const monitor = await monitorDal.create({
            name: 'test',
            type: 'monitor',
            configuration_id: configuration.id,
            configuration_object: '{}',
            is_enabled: true
        })

        return request(server)
            .put('/api/monitors/'+monitor.id)
            .send(requestBody)
            .expect(200)
            .then(async (res) => {
                const monitorUpdated = await monitorDal.getById(monitor.id)

                expect(monitorUpdated.name).toBe('test_updated')
                expect(monitorUpdated.type).toBe('monitor_updated')
                expect(monitorUpdated.configuration_id).toBe(1)
                expect(monitorUpdated.configuration_object).toBe('{"true"}')
                expect(monitorUpdated.is_enabled).toBe(false)
            });
    });
});