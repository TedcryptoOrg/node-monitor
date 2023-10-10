import {setupIntegrationTest, teardownIntegrationTest} from "../../../Helper/integrationTest";
import {create} from "../../../../src/database/dal/configuration";
import request = require("supertest");
import {server} from "../../../../src/server";
import {ServerInput} from "../../../../src/database/models/server";

beforeAll((done) => {
    setupIntegrationTest(done);
})

afterAll((done) => {
    teardownIntegrationTest(done);
});

describe('create servers controller', () => {
    it('should create a server', async () => {
        const configuration = await create({
            name: 'test',
            chain: 'test',
            is_enabled: true
        })

        const serverInput: ServerInput = {
            name: 'test',
            address: 'test',
            is_enabled: true,
            configuration_id: configuration.id
        }

        return request(server)
            .post('/api/servers')
            .send(serverInput)
            .expect(202)
            .then((res) => {
                expect(res.body.name).toBe('test')
                expect(res.body.address).toBe('test')
                expect(res.body.configuration_id).toBe(1)
                expect(res.body.is_enabled).toBe(true)
            });
    });
});