import request = require("supertest");
import * as configurationDal from "../../../../src/database/dal/configuration";
import {ConfigurationInput} from "../../../../src/database/models/configuration";
import {setupIntegrationTest, teardownIntegrationTest} from "../../../Helper/integrationTest";
import {server} from "../../../../src/server";
import configurations from "../../../../src/routes/configurations";

beforeAll((done) => {
    setupIntegrationTest(done);
})

afterAll((done) => {
    teardownIntegrationTest(done);
});

describe('delete configurations controller', () => {
    it('should delete configuration', async () => {
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

        expect(configurationDal.getAll()).resolves.toHaveLength(1)

        return request(server)
            .delete('/api/configurations/'+configuration.id)
            .send(requestBody)
            .expect(200)
            .then((res) => {
                expect(configurationDal.getAll()).resolves.toHaveLength(0)
            });
    });
});