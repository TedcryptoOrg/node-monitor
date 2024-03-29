import Monitor from "./Monitor";
import Configuration from "../Configuration/Configuration";
import {MonitorType} from "./MonitorType";
import Server from "../Server/Server";

export default class BlockCheckMonitor implements Monitor {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly type: MonitorType.BLOCK_CHECK,
        public readonly configuration: Configuration,
        public readonly alertSleepDurationMinutes: number,
        public readonly checkIntervalSeconds: number,
        public readonly isEnabled: boolean,
        public readonly server: Server,
        public readonly missTolerance: number,
        public readonly missToleranceIntervalSeconds: number,
    ) {
    }

    getFullName(): string {
        return `[Configuration: ${this.configuration.name}(${this.configuration.id})][Server: ${this.server.name}(${this.server.id})]`
            +`[Monitor: ${this.name}(${this.type.toString()})(${this.id})]`
    }
}