import {CheckStatus} from "../../../Domain/Checker/CheckStatusEnum";

export default class CheckState {
    constructor(
        public readonly status: CheckStatus,
        public readonly lastPingTime: number,
        public readonly lastAlertedTime: number,
    ) {
    }

    withStatus(status: CheckStatus): CheckState {
        return new CheckState(status, this.lastPingTime, this.lastAlertedTime);
    }

    withLastPingTime(lastPingTime: number): CheckState {
        return new CheckState(this.status, lastPingTime, this.lastAlertedTime);
    }

    withLastAlertedTime(lastAlertedTime: number): CheckState {
        return new CheckState(this.status, this.lastPingTime, lastAlertedTime);
    }
}
