import { MissCounter } from '../../../src/monitor/checkers/missCounter';
import {AlertChannel} from "../../../src/AlertChannel/alertChannel";
import {PriceFeeder} from "../../../src/monitor/priceFeeder";
import {Configuration} from "../../../src/type/configuration";

describe('PriceFeeder', () => {
    let priceFeeder: PriceFeeder;
    const mockConfig: Configuration = {
        chainName: 'kujira',
        valoperAddress: 'kujiravaloper1excmz0f7k9z3ydchv8t2pde8v45hjl2x3ud5q3',
        priceFeeder: {
            miss_tolerance: 5,
            miss_tolerance_period_seconds: 5,
            sleep_duration_seconds: 5,
            alert_sleep_duration_minutes: 5,
        },
        rest: {
            address: 'http://localhost:1317',
        }
    };
    const alertChannels: AlertChannel[] = [];

    beforeEach(() => {
        priceFeeder = new PriceFeeder('kujira', mockConfig, alertChannels);
    });

    describe('start', () => {
        it('should call the check method of all monitor_params', async () => {
            const mockMissCounter = { check: jest.fn() };
            jest.spyOn(MissCounter.prototype, 'check').mockImplementation(mockMissCounter.check);

            await priceFeeder.start();

            expect(mockMissCounter.check).toHaveBeenCalledTimes(1);
        });
    });
});
