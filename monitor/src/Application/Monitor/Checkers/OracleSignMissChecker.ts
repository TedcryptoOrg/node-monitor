import Command from "../../../Domain/Command/Command";
import {AbstractChecker} from "./AbstractChecker";
import CheckResult from "../CheckResult";
import CheckSignCommandState from "../CheckSignMiss/CheckSignCommandState";
import CheckOracleSignMissCommand from "../CheckOracleSignMiss/CheckOracleSignMissCommand";
import OracleSignMissMonitor from "../../../Domain/Monitor/OracleSignMissMonitor";
import CheckOracleSignCommandState from "../CheckOracleSignMiss/CheckOracleSignCommandState";

export default class OracleSignMissChecker extends AbstractChecker {
    private lastCommandState: CheckSignCommandState|undefined

    getCommand(): Command {
        if (!(this.monitor instanceof OracleSignMissMonitor)) {
            throw new Error(`Invalid monitor type. Expected "${OracleSignMissMonitor.name} but got "${this.monitor.constructor.name}"`)
        }

        return new CheckOracleSignMissCommand(
            this.monitor.getFullName(),
            this.monitor.configuration,
            this.monitor.valoperAddress,
            this.monitor.missTolerance,
            this.monitor.missToleranceIntervalSeconds,
            this.lastCommandState
        )
    }

    protected async postCheck(result: CheckResult): Promise<void> {
        if (!(result.state instanceof CheckOracleSignCommandState)) {
            throw new Error('Invalid last command state')
        }

        this.lastCommandState = result.state
        await super.postCheck(result)
    }
}
