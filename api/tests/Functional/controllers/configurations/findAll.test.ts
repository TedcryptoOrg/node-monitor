import request = require("supertest");
import * as configurationDal from "../../../../src/database/dal/configuration";
import {setupIntegrationTest, teardownIntegrationTest} from "../../../Helper/integrationTest";
import {server} from "../../../../src/server";

beforeAll((done) => {
    setupIntegrationTest(done);
})

afterAll((done) => {
    teardownIntegrationTest(done);
});

describe('find all configurations controller', () => {
    it('should find all configurations', async () => {
        await configurationDal.create({
            name: 'test',
            chain: 'test',
            is_enabled: true
        })

        return request(server)
            .get('/api/configurations')
            .expect(200)
            .then((res) => {
                const configuration = res.body[0]
                expect(configuration.id).toBe(1)
                expect(configuration.name).toBe('test')
                expect(configuration.chain).toBe('test')
                expect(configuration.is_enabled).toBe(true)
                expect(configuration.createdAt).toBeDefined()
                expect(configuration.updatedAt).toBeDefined()
            })
    });
});