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

describe('delete configurations controller', () => {
    it('should delete configuration', async () => {
        const configuration = await configurationDal.create({
            name: 'test',
            chain: 'chain',
            is_enabled: true
        })

        expect(configurationDal.getAll()).resolves.toHaveLength(1)

        return request(server)
            .delete('/api/configurations/'+configuration.id)
            .expect(200)
            .then((res) => {
                expect(configurationDal.getAll()).resolves.toHaveLength(0)
            });
    });
});