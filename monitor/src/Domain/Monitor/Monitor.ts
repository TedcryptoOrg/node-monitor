import Configuration from "../Configuration/Configuration";
import {MonitorType} from "./MonitorType";

export default interface Monitor {
    id: number,
    name: string,
    type: MonitorType,
    configuration: Configuration,
    alertSleepDurationMinutes: number
    isEnabled: boolean;
    checkIntervalSeconds: number;

    getFullName(): string;
}
