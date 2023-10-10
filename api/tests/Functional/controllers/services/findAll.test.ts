import request = require("supertest");
import * as configurationDal from "../../../../src/database/dal/configuration";
import * as serverDal from "../../../../src/database/dal/server";
import * as serviceDal from "../../../../src/database/dal/service";
import {setupIntegrationTest, teardownIntegrationTest} from "../../../Helper/integrationTest";
import {server} from "../../../../src/server";
import {SERVICE_TYPES} from "../../../../src/database/models/service";

beforeAll((done) => {
    setupIntegrationTest(done);
})

afterAll((done) => {
    teardownIntegrationTest(done);
});

describe('find all servers controller', () => {
    it('should find all servers', async () => {
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
        await serviceDal.create({
            name: 'test',
            address: 'test',
            server_id: serverObject.id,
            type: SERVICE_TYPES.RPC,
            is_enabled: true
        })

        return request(server)
            .get('/api/services')
            .expect(200)
            .then((res) => {
                const service = res.body[0]
                expect(service.id).toBe(1)
                expect(service.name).toBe('test')
                expect(service.address).toBe('test')
                expect(service.type).toBe(SERVICE_TYPES.RPC)
                expect(service.server_id).toBe(1)
                expect(service.is_enabled).toBe(true)
                expect(service.createdAt).toBeDefined()
                expect(service.updatedAt).toBeDefined()
            })
    });
});