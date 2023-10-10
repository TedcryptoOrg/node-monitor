import request = require("supertest");
import * as configurationDal from "../../../../src/database/dal/configuration";
import * as serverDal from "../../../../src/database/dal/server";
import {setupIntegrationTest, teardownIntegrationTest} from "../../../Helper/integrationTest";
import {server} from "../../../../src/server";
import {ServerInput} from "../../../../src/database/models/server";

beforeAll((done) => {
    setupIntegrationTest(done);
})

afterAll((done) => {
    teardownIntegrationTest(done);
});

describe('update servers controller', () => {
    it('should update server', async () => {
        const requestBody: ServerInput = {
            name: 'test_updated',
            address: 'address_updated',
            configuration_id: 1,
            is_enabled: false
        }

        const configuration = await configurationDal.create({
            name: 'test',
            chain: 'chain',
            is_enabled: true
        })
        const serverObject = await serverDal.create({
            name: 'test',
            address: 'test',
            configuration_id: configuration.id,
            is_enabled: true
        })

        return request(server)
            .put('/api/servers/'+serverObject.id)
            .send(requestBody)
            .expect(200)
            .then((res) => {
                expect(res.body.name).toBe('test_updated')
                expect(res.body.address).toBe('address_updated')
                expect(res.body.configuration_id).toBe(1)
                expect(res.body.is_enabled).toBe(false)
            });
    });
});