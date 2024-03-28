import Configuration from "../../../src/Domain/Configuration/Configuration";
import Monitor from "../../../src/Domain/Monitor/Monitor";
import {MonitorType} from "../../../src/Domain/Monitor/MonitorType";

export default class TestOnceMonitor implements Monitor {
    constructor(
        public id: number,
        public name: string,
        public type: MonitorType,
        public configuration: Configuration,
        public alertSleepDurationMinutes: number,
        public isEnabled: boolean,
        public checkIntervalSeconds: number
    ) {}

    getFullName(): string {
        return 'TestOnceMonitor';
    }
}