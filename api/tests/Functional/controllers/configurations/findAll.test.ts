import axios from "axios";
import {create} from "../../../../src/database/dal/configuration";
import {createAndResetDatabaseInstance} from "../../../Helper/databaseHelper";

describe('find all configurations controller', () => {

    beforeAll(async () => {
        await createAndResetDatabaseInstance();
    })

    it('should find all configurations', () => {
        create({
            name: 'test',
            chain: 'test',
            is_enabled: true
        })

        axios.get('http://localhost:3002/api/configurations')
            .then((response) => {
                expect(response.status).toBe(200)
                const configuration = response.data[0]
                expect(configuration.id).toBe(1)
                expect(configuration.name).toBe('test')
                expect(configuration.chain).toBe('test')
                expect(configuration.is_enabled).toBe(true)
                expect(configuration.createdAt).toBeDefined()
                expect(configuration.updatedAt).toBeDefined()
            })
            .catch((err) => {
                console.log(err)
                throw err;
            })
    });
});