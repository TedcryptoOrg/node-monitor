import request = require("supertest");
import * as configurationDal from "../../../../src/database/dal/configuration";
import {ConfigurationInput} from "../../../../src/database/models/configuration";
import {setupIntegrationTest, teardownIntegrationTest} from "../../../Helper/integrationTest";
import {server} from "../../../../src/server";

beforeAll((done) => {
    setupIntegrationTest(done);
})

afterAll((done) => {
    teardownIntegrationTest(done);
});

describe('update configurations controller', () => {
    it('should update configuration', async () => {
        const requestBody: ConfigurationInput = {
            name: 'test_updated',
            chain: 'chain_updated',
            is_enabled: false
        }

        const configuration = await configurationDal.create({
            name: 'test',
            chain: 'chain',
            is_enabled: true
        })

        return request(server)
            .put('/api/configurations/'+configuration.id)
            .send(requestBody)
            .expect(200)
            .then((res) => {
                expect(res.body.name).toBe('test_updated')
                expect(res.body.chain).toBe('chain_updated')
                expect(res.body.is_enabled).toBe(false)
            });
    });
});