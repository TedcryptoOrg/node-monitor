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
        const service = await serviceDal.create({
            name: 'test',
            address: 'test',
            server_id: serverObject.id,
            type: SERVICE_TYPES.RPC,
            is_enabled: true
        });

        expect(serviceDal.getAll()).resolves.toHaveLength(1)

        return request(server)
            .delete('/api/services/'+service.id)
            .expect(200)
            .then((res) => {
                expect(serviceDal.getAll()).resolves.toHaveLength(0)
            });
    });
});