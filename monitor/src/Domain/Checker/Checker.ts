import Monitor from "../Monitor/Monitor";

export default interface Checker {
    start(): void;

    stop(): void;

    updateMonitor(monitor: Monitor): void;

    check(): Promise<void>;
}
