import {setupIntegrationTest, teardownIntegrationTest} from "../../../Helper/integrationTest";
import * as configurationDal from "../../../../src/database/dal/configuration";
import request = require("supertest");
import {server} from "../../../../src/server";
import {MonitorInput} from "../../../../src/database/models/monitor";

beforeAll((done) => {
    setupIntegrationTest(done);
})

afterAll((done) => {
    teardownIntegrationTest(done);
});

describe('create monitors controller', () => {
    it('should create a monitor', async () => {
        const configuration = await configurationDal.create({
            name: 'test',
            chain: 'test',
            is_enabled: true
        })

        const monitorInput: MonitorInput = {
            name: 'test',
            type: 'test',
            configuration_id: configuration.id,
            configuration_object: '{}',
            is_enabled: true,
        }

        return request(server)
            .post('/api/monitors')
            .send(monitorInput)
            .expect(202)
            .then((res) => {
                expect(res.body.name).toBe('test')
                expect(res.body.type).toBe('test')
                expect(res.body.configuration_id).toBe(1)
                expect(res.body.configuration_object).toBe('{}')
                expect(res.body.is_enabled).toBe(true)
            });
    });
});