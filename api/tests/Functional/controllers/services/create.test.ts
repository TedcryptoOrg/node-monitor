import {setupIntegrationTest, teardownIntegrationTest} from "../../../Helper/integrationTest";
import * as configurationDal from "../../../../src/database/dal/configuration";
import * as serverDal from "../../../../src/database/dal/server";
import request = require("supertest");
import {SERVICE_TYPES, ServiceInput} from "../../../../src/database/models/service";
import {server} from "../../../../src/server";

beforeAll((done) => {
    setupIntegrationTest(done);
})

afterAll((done) => {
    teardownIntegrationTest(done);
});

describe('create servers controller', () => {
    it('should create a server', async () => {
        const configuration = await configurationDal.create({
            name: 'test',
            chain: 'test',
            is_enabled: true
        })
        const serverObject = await serverDal.create({
            name: 'test',
            address: 'test',
            is_enabled: true,
            configuration_id: configuration.id
        })
        const serviceInput: ServiceInput = {
            name: 'test',
            address: 'test',
            server_id: serverObject.id,
            type: SERVICE_TYPES.RPC,
            is_enabled: true
        }

        return request(server)
            .post('/api/services')
            .send(serviceInput)
            .expect(202)
            .then((res) => {
                expect(res.body.name).toBe('test')
                expect(res.body.address).toBe('test')
                expect(res.body.server_id).toBe(1)
                expect(res.body.is_enabled).toBe(true)
            });
    });
});