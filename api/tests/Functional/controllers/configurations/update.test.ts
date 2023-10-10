import axios from "axios";
import {createAndResetDatabaseInstance} from "../../../Helper/databaseHelper";
import {create} from "../../../../src/database/dal/configuration";
import {ConfigurationInput} from "../../../../src/database/models/configuration";
import {startServer} from "../../../Helper/server";

const host = startServer();

describe('update configurations controller', () => {
    beforeAll(async () => {
        await createAndResetDatabaseInstance();
    })

    it('should update configuration', async () => {
        const requestBody: ConfigurationInput = {
            name: 'test_updated',
            chain: 'chain_updated',
            is_enabled: false
        }

        const configuration = await create({
            name: 'test',
            chain: 'chain',
            is_enabled: true
        })

        const response = await axios.put(host + '/api/configurations/'+configuration.id, requestBody);
        expect(response.status).toBe(200)
        expect(response.data.name).toBe('test_updated')
        expect(response.data.chain).toBe('chain_updated')
        expect(response.data.is_enabled).toBe(false)
    });
});