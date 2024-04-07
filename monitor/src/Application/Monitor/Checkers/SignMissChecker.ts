import Command from "../../../Domain/Command/Command";
import {AbstractChecker} from "./AbstractChecker";
import CheckSignMissCommand from "../CheckSignMiss/CheckSignMissCommand";
import SignMissMonitor from "../../../Domain/Monitor/SignMissMonitor";
import CheckResult from "../CheckResult";
import CheckSignCommandState from "../CheckSignMiss/CheckSignCommandState";
import CheckBlockCommandState from "../CheckBlock/CheckBlockCommandState";

export default class SignMissChecker extends AbstractChecker {
    private lastCommandState: CheckSignCommandState|CheckBlockCommandState|undefined

    getCommand(): Command {
        if (!(this.monitor instanceof SignMissMonitor)) {
            throw new Error('Invalid monitor type')
        }
        if (this.lastCommandState !== undefined
            && !(this.lastCommandState instanceof CheckSignCommandState)) {
            throw new Error('Invalid last state type')
        }

        return new CheckSignMissCommand(
            this.monitor.getFullName(),
            this.monitor.configuration,
            this.monitor.valoperAddress,
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
