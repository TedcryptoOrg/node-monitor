import Monitor from "../../Domain/Monitor/Monitor";
import CheckResult from "./CheckResult";
import {CheckStatus} from "../../Domain/Checker/CheckStatusEnum";

export default class CheckStatusChanged {
    constructor(
        public monitor: Monitor,
        public lastStatus: CheckStatus,
        public checkResult: CheckResult
    ) {}
}
