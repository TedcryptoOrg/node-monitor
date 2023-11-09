import request = require("supertest");
import * as configurationDal from "../../../../src/database/dal/configuration";
import * as serverDal from "../../../../src/database/dal/server";
import * as serviceDal from "../../../../src/database/dal/service";
import {setupIntegrationTest, teardownIntegrationTest} from "../../../Helper/integrationTest";
import {server} from "../../../../src/server";
import {SERVICE_TYPES, ServiceInput} from "../../../../src/database/models/service";

jest.retryTimes(3);
jest.setTimeout(30000);

beforeAll((done) => {
    setupIntegrationTest(done);
})

afterAll((done) => {
    teardownIntegrationTest(done);
});

describe('update servers controller', () => {
    it('should update server', async () => {
        const requestBody: ServiceInput = {
            name: 'test_updated',
            address: 'address_updated',
            server_id: 1,
            type: SERVICE_TYPES.REST,
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
        await serviceDal.create({
            name: 'test',
            address: 'test',
            server_id: serverObject.id,
            type: SERVICE_TYPES.RPC,
            is_enabled: true
        });

        return request(server)
            .put('/api/services/'+serverObject.id)
            .send(requestBody)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({});
            });
    });
});