import Server from "../Server/Server";
import Monitor from "./Monitor";
import Configuration from "../Configuration/Configuration";
import {MonitorType} from "./MonitorType";

export default class DiskSpaceCheckMonitor implements Monitor {
    constructor(
        public readonly id: number,
        public readonly configuration: Configuration,
        public readonly name: string,
        public readonly type: MonitorType,
        public readonly server: Server,
        public readonly threshold: number,
        public readonly alertSleepDurationMinutes: number,
        public readonly checkIntervalSeconds: number,
        public readonly pingIntervalSeconds: number,
        public readonly isEnabled: boolean
    ) {
    }

    getFullName(): string {
        return `[Configuration: ${this.configuration.name}][Server: ${this.server.name}][Monitor: ${this.name}(${this.type.toString()})]`;
    }
}
