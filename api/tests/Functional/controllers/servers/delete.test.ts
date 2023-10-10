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

describe('delete servers controller', () => {
    it('should delete configuration', async () => {
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

        expect(serverDal.getAll()).resolves.toHaveLength(1)

        return request(server)
            .delete('/api/servers/'+serverObject.id)
            .expect(200)
            .then((res) => {
                expect(serverDal.getAll()).resolves.toHaveLength(0)
            });
    });
});