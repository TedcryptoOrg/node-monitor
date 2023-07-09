import axios from 'axios';
import { MissCounter } from '../../src/monitor/params/miss_counter';
import MockAdapter from "axios-mock-adapter";

describe('MissCounter', () => {
    let missCounter: MissCounter;

    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    beforeEach(() => {
        missCounter = new MissCounter('http://localhost:1317');
    });

    afterEach(() => {
        mock.reset();
    });

    it('should fetch miss counter from kujira endpoint', async () => {
        const valoperAddress: string = 'kujira18lap75eu2sw4el35urw202j3ld9g0m3n3gz97q';

        mock
            .onGet(`http://localhost:1317/oracle/validators/kujira18lap75eu2sw4el35urw202j3ld9g0m3n3gz97q/miss`)
            .replyOnce(200, {
                data: {
                    miss_counter: 5,
                },
            })

        const missCounterValue = await missCounter.fetchMissCounter(valoperAddress);

        expect(missCounterValue).toBe(5);
    });

    it('should fetch miss counter from ojo endpoint', async () => {
        const valoperAddress: string = 'ojovaloper182pkssfuwm6p2247p0296lh67a7j3khdggehdj';

        mock
            .onGet(`http://localhost:1317/ojo/oracle/v1/validators/ojovaloper182pkssfuwm6p2247p0296lh67a7j3khdggehdj/miss`)
            .replyOnce(200, {
                data: {
                    miss_counter: 5,
                },
            })

        const missCounterValue = await missCounter.fetchMissCounter(valoperAddress);

        expect(missCounterValue).toBe(5);
    });

    it('should throw error for unknown chain', async () => {
        const valoperAddress = 'unknownvaloper1abcxyz';

        expect.assertions(1);
        try {
            await missCounter.fetchMissCounter(valoperAddress);
        } catch (error) {
            expect(error.message).toBe('No endpoint found for chain: unknown');
        }
    });

    it('should throw error if request fails', async () => {
        const valoperAddress: string = 'ojovaloper182pkssfuwm6p2247p0296lh67a7j3khdggehdj';

        mock
            .onGet(`http://localhost:1317/ojo/oracle/v1/validators/ojovaloper182pkssfuwm6p2247p0296lh67a7j3khdggehdj/miss`)
            .networkError();

        expect.assertions(1);
        try {
            await missCounter.fetchMissCounter(valoperAddress);
        } catch (error) {
            expect(error.message).toBe('Error fetching miss counter');
        }
    });
});
