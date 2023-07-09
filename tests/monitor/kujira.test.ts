import { Kujira } from '../../src/monitor/Kujira';
import { Configuration } from '../../src/type/configuration';
import { MissCounter } from '../../src/monitor/params/miss_counter';
import {Alerter} from "../../src/alerter/alerter";

describe('Kujira', () => {
    let kujira: Kujira;
    const mockConfig: Configuration = {
        miss_tolerance: 5,
        miss_tolerance_period: 5,
        sleep_duration: 5,
        alert_sleep_duration: 5,
        node_rest: 'http://localhost:1317',
        valoper_address: 'your-valoper-address',
    };
    const mockAlerters: Alerter[] = [];

    beforeEach(() => {
        kujira = new Kujira(mockConfig, mockAlerters);
    });

    describe('start', () => {
        it('should call the check method of all monitor_params', async () => {
            const mockMissCounter = { check: jest.fn() };
            jest.spyOn(MissCounter.prototype, 'check').mockImplementation(mockMissCounter.check);

            await kujira.start();

            expect(mockMissCounter.check).toHaveBeenCalledTimes(1);
        });
    });
});
