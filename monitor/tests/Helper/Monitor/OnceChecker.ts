import { CheckStatus } from "../../../src/Domain/Checker/CheckStatusEnum";
import Checker from "../../../src/Domain/Checker/Checker";
import Monitor from "../../../src/Domain/Monitor/Monitor";

export default class OnceChecker implements Checker {
    private events: string[] = [];
    private checkerException: Error|null = null;
    private status: CheckStatus = CheckStatus.UNKNOWN;

    setCheckerException(error: Error) {
        this.checkerException = error
    }

    getEvents(): string[] {
        return this.events;
    }

    setStatus(status: CheckStatus): void {
        this.status = status;
    }

    getStatus(): CheckStatus {
        return this.status;
    }

    hasEvent(event: string): boolean {
        return this.events.includes(event);
    }

    start(): void {
        this.events.push('start');
    }

    stop(): void {
        console.log('stop');
        this.events.push('stop');
    }

    updateMonitor(monitor: Monitor): void {
        this.events.push('update');
    }

    check(): Promise<void> {
        if (this.checkerException) {
            return Promise.reject(this.checkerException);
        }

        this.events.push('check');
        return Promise.resolve();
    }
}