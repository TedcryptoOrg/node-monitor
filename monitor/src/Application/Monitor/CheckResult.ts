import {CheckStatus} from "../../Domain/Checker/CheckStatusEnum";

export default class CheckResult {
    constructor(
        public readonly status: CheckStatus,
        public readonly message: string,
    ) {
    }
}