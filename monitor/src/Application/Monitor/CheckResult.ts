import {CheckStatus} from "../../Domain/Checker/CheckStatusEnum";
import CheckSignCommandState from "./CheckSignMiss/CheckSignCommandState";
import CheckBlockCommandState from "./CheckBlock/CheckBlockCommandState";

export default class CheckResult {
    constructor(
        public readonly status: CheckStatus,
        public readonly message: string,
        public readonly state?: CheckSignCommandState|CheckBlockCommandState
    ) {
    }
}