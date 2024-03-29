import Command from "../../../Domain/Command/Command";
import {AbstractChecker} from "./AbstractChecker";
import CheckResult from "../CheckResult";
import CheckSignCommandState from "../CheckSignMiss/CheckSignCommandState";
import CheckBlockCommandState from "../CheckBlock/CheckBlockCommandState";
import CheckBlockCommand from "../CheckBlock/CheckBlockCommand";
import BlockCheckMonitor from "../../../Domain/Monitor/BlockCheckMonitor";

export default class BlockChecker extends AbstractChecker {
    private lastCommandState: CheckSignCommandState|CheckBlockCommandState|undefined

    getCommand(): Command {
        if (!(this.monitor instanceof BlockCheckMonitor)) {
            throw new Error('Invalid monitor type')
        }
        if (this.lastCommandState !== undefined
            && !(this.lastCommandState instanceof CheckBlockCommandState)) {
            throw new Error('Invalid last state type')
        }

        return new CheckBlockCommand(
            this.monitor.getFullName(),
            this.monitor.configuration,
            this.monitor.server,
            this.monitor.missTolerance,
            this.monitor.missToleranceIntervalSeconds,
            this.lastCommandState
        )
    }

    protected async postCheck(result: CheckResult): Promise<void> {
        this.lastCommandState = result.state
        await super.postCheck(result)
    }
}
