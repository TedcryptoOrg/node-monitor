import {CheckStatus} from "../../../Domain/Checker/CheckStatusEnum";

export default class CheckOracleSignCommandState {
    constructor(
        public readonly resolvedMissCounter: number,
        public readonly lastNumberOfBlocksMissed: number,
        public readonly lastRun: number,
        public readonly lastStatus: CheckStatus
    ) {
    }

    static fresh(currentMissCounter: number): CheckOracleSignCommandState {
        return new CheckOracleSignCommandState(currentMissCounter, currentMissCounter, 0, CheckStatus.OK)
    }

    withStatus(currentMissCounter: number, status: CheckStatus): CheckOracleSignCommandState {
        return new CheckOracleSignCommandState(this.resolvedMissCounter, currentMissCounter, new Date().getTime(), status)
    }

    reset(currentMissCounter: number): CheckOracleSignCommandState {
        return CheckOracleSignCommandState.fresh(currentMissCounter)
    }
}