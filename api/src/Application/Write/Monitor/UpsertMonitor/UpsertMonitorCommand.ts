import Command from "../../../../Domain/Command/Command";
import {MonitorType} from "../../../../Domain/Monitor/MonitorType";

export default class UpsertMonitorCommand implements Command {
    constructor(
        public readonly name: string,
        public readonly type: MonitorType,
        public readonly isEnabled: boolean,
        public readonly configurationId: number | null,
        public readonly configurationObject: string,
        public readonly serverId: number | null,
        public readonly lastCheck: Date | null,
        public readonly status?: boolean,
        public readonly lastError?: string,
        public readonly id?: number,
    ) {}
}
