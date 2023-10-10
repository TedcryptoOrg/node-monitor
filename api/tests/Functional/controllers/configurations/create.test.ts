import {setupIntegrationTest, teardownIntegrationTest} from "../../../Helper/integrationTest";
import request = require("supertest");
import {server} from "../../../../src/server";

beforeAll((done) => {
    setupIntegrationTest(done);
})

afterAll((done) => {
    teardownIntegrationTest(done);
});

describe('create configurations controller', () => {
    it('should create a configuration', () => {
        const configuration = {
            name: 'test',
            chain: 'test'
        }

        return request(server)
            .post('/api/configurations')
            .send(configuration)
            .expect(202)
            .then((res) => {
                expect(res.body.name).toBe(configuration.name)
                expect(res.body.chain).toBe(configuration.chain)
            });
    });
});