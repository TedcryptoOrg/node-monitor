import { CheckStatus } from "../../../src/Domain/Checker/CheckStatusEnum";
import Checker from "../../../src/Domain/Checker/Checker";
import Monitor from "../../../src/Domain/Monitor/Monitor";

export default class OnceChecker implements Checker {
    private events: string[] = [];
    private checkerException: Error|null = null;

    setCheckerException(error: Error) {
        this.checkerException = error
    }

    getEvents(): string[] {
        return this.events;
    }

    getStatus(): CheckStatus {
        return CheckStatus.UNKNOWN;
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