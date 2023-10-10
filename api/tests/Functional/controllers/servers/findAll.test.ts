import request = require("supertest");
import * as configurationDal from "../../../../src/database/dal/configuration";
import * as serverDal from "../../../../src/database/dal/server";
import {setupIntegrationTest, teardownIntegrationTest} from "../../../Helper/integrationTest";
import {server} from "../../../../src/server";

beforeAll((done) => {
    setupIntegrationTest(done);
})

afterAll((done) => {
    teardownIntegrationTest(done);
});

describe('find all servers controller', () => {
    it('should find all servers', async () => {
        const configuration = await configurationDal.create({
            name: 'test',
            chain: 'test',
            is_enabled: true
        })
        const serverObject = await serverDal.create({
            name: 'test',
            address: 'test',
            configuration_id: configuration.id,
            is_enabled: true
        })

        return request(server)
            .get('/api/servers')
            .expect(200)
            .then((res) => {
                const server = res.body[0]
                expect(server.id).toBe(1)
                expect(server.name).toBe('test')
                expect(server.address).toBe('test')
                expect(server.configuration_id).toBe(1)
                expect(server.is_enabled).toBe(true)
                expect(server.createdAt).toBeDefined()
                expect(server.updatedAt).toBeDefined()
            })
    });
});