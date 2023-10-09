import axios from "axios";

jest.setTimeout(30000);

describe('create configurations controller', () => {
    it('should create a configuration', () => {
        // create a post object
        const configuration = {
            name: 'test',
            chain: 'test'
        }

        axios.post('http://localhost:3002/api/configurations', configuration)
            .then((response) => {
                expect(response.status).toBe(202)
                expect(response.data.name).toBe(configuration.name)
                expect(response.data.chain).toBe(configuration.chain)
            })
            .catch((err) => {
                console.log(err)
                throw err;
            })
    });
});