import Checker from "../../../../Domain/Checker/Checker";
import CommandHandler from "../../../../Domain/Command/CommandHandler";
import CheckDiskSpaceCommand from "./CheckDiskSpaceCommand";
import CheckResult from "../CheckResult";
import DiskSpaceCheckMonitor from "../../../../Domain/Monitor/DiskSpaceCheckMonitor";
import {sleep} from "../../../Shared/sleep";
import {CheckStatus} from "../../../../Domain/Checker/CheckStatusEnum";
import CheckState from "../CheckState";

export default class DiskSpaceChecker implements Checker {
    constructor(
        private readonly commandHandler: CommandHandler,
        private monitor: DiskSpaceCheckMonitor,
        private state: CheckState,
        private stopSignal: boolean = false
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

    updateMonitor(monitor: DiskSpaceCheckMonitor): void {
        this.monitor = monitor;
    }

    async check(): Promise<void> {
        while (!this.stopSignal) {
            const result: CheckResult = await this.commandHandler.handle(new CheckDiskSpaceCommand(
                this.monitor.name,
                this.monitor.server,
                this.monitor.threshold,
            ));

            console.log(`${this.monitor.getFullName()}[Status: ${result.status.toString()}] ${result.message}`);

            if (this.state.status !== result.status) {
                //await this.eventDispatcher.dispatch(new CheckStatusChanged(this.monitor, this.state.status, result));
            }

            this.state = this.state.withStatus(CheckStatus.OK);

            console.log(`${this.monitor.getFullName()} Sleeping for ${this.monitor.checkIntervalSeconds} seconds`)

            await sleep(1000 * this.monitor.checkIntervalSeconds);
        }
    }
}
