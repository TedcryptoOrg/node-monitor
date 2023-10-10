import request = require("supertest");
import * as configurationDal from "../../../../src/database/dal/configuration";
import * as monitorDal from "../../../../src/database/dal/monitor";
import {setupIntegrationTest, teardownIntegrationTest} from "../../../Helper/integrationTest";
import {server} from "../../../../src/server";
import monitor from "../../../../src/database/models/monitor";

beforeAll((done) => {
    setupIntegrationTest(done);
})

afterAll((done) => {
    teardownIntegrationTest(done);
});

describe('GET /monitor', () => {
    it('should find all monitors', async () => {
        const configuration = await configurationDal.create({
            name: 'test',
            chain: 'test',
            is_enabled: true
        })
        await monitorDal.create({
            name: 'test',
            type: 'test',
            configuration_id: configuration.id,
            configuration_object: '{}',
            is_enabled: true
        })

        return request(server)
            .get('/api/monitors')
            .expect(200)
            .then((res) => {
                const server = res.body[0]
                expect(server.id).toBe(1)
                expect(server.name).toBe('test')
                expect(server.type).toBe('test')
                expect(server.configuration_id).toBe(1)
                expect(server.configuration_object).toBe('{}')
                expect(server.is_enabled).toBe(true)
                expect(server.createdAt).toBeDefined()
                expect(server.updatedAt).toBeDefined()
            })
    });
});