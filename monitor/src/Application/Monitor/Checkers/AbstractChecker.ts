import Checker from "../../../Domain/Checker/Checker";
import Monitor from "../../../Domain/Monitor/Monitor";
import CommandHandler from "../../../Domain/Command/CommandHandler";
import {CheckStatus} from "../../../Domain/Checker/CheckStatusEnum";
import CheckResult from "../CheckResult";
import {sleep} from "../../Shared/sleep";
import Command from "../../../Domain/Command/Command";

export abstract class AbstractChecker implements Checker {
    constructor(
        protected commandHandler: CommandHandler,
        protected monitor: Monitor,
        protected status: CheckStatus = CheckStatus.UNKNOWN,
        protected stopSignal: boolean = false
    ) {
    }

    start(): void {
        if (!this.stopSignal) {
            console.log(`${this.monitor.getFullName()} Already running`)
            return;
        }
        console.log(`${this.monitor.getFullName()} Starting...`);

        this.stopSignal = false;
        this.check();
    }

    stop(): void {
        console.log(`${this.monitor.getFullName()} Stopping...`)
        this.stopSignal = true;
    }

    updateMonitor(monitor: Monitor): void {
        this.monitor = monitor;
    }

    getStatus(): CheckStatus {
        return this.status;
    }

    abstract getCommand(): Command;

    async check(): Promise<void> {
        do {
            const result: CheckResult = await this.commandHandler.handle(this.getCommand());

            console.log(`${this.monitor.getFullName()}[Status: ${result.status.toString()}] ${result.message}`);

            if (this.status !== result.status) {
                //await this.eventDispatcher.dispatch(new CheckStatusChanged(this.monitor, this.state.status, result));
            }

            this.status = result.status;

            console.log(`${this.monitor.getFullName()} Sleeping for ${this.monitor.checkIntervalSeconds} seconds`)

            if (!this.stopSignal) {
                await sleep(1000 * this.monitor.checkIntervalSeconds);
            }
        } while (!this.stopSignal);
    }
}
