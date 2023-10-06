import {AlertChannel} from "../../../src/AlertChannel/alertChannel";
import {MissCounter} from "../../../src/monitor/checkers/priceFeeder/missCounter";
import {PriceFeederMissCountConfiguration} from "../../../src/type/config/priceFeederMissCountConfiguration";

describe('PriceFeeder', () => {
    let priceFeederMissCounter: MissCounter;
    const mockConfig: PriceFeederMissCountConfiguration = {
        valoper_address: 'kujiravaloper1excmz0f7k9z3ydchv8t2pde8v45hjl2x3ud5q3',
        miss_tolerance: 5,
        miss_tolerance_period_seconds: 5,
        sleep_duration_seconds: 5,
        alert_sleep_duration_minutes: 5,
        rest_address: 'http://localhost:1317',
    };
    const alertChannels: AlertChannel[] = [];

    beforeEach(() => {
        priceFeederMissCounter = new MissCounter('kujira', mockConfig, alertChannels);
    });

    describe('start', () => {
        it('should call the check method of all monitor_params', async () => {
            const mockMissCounter = { check: jest.fn() };
            jest.spyOn(MissCounter.prototype, 'check').mockImplementation(mockMissCounter.check);

            await priceFeederMissCounter.check();

            expect(mockMissCounter.check).toHaveBeenCalledTimes(1);
        });
    });
});
