import Monitor from "../Monitor/Monitor";
import {CheckStatus} from "./CheckStatusEnum";

export default interface Checker {
    start(): void;

    stop(): void;

    updateMonitor(monitor: Monitor): void;

    check(): Promise<void>;

    setStatus(status: CheckStatus): void;

    getStatus(): CheckStatus;
}
