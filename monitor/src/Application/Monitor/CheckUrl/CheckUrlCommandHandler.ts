import CommandHandler from "../../../Domain/Command/CommandHandler";
import CheckUrlCommand from "./CheckUrlCommand";
import axios from "axios";
import CheckResult from "../CheckResult";
import {CheckStatus} from "../../../Domain/Checker/CheckStatusEnum";
import {injectable} from "inversify";

@injectable()
export default class CheckUrlCommandHandler implements CommandHandler {
    async handle(command: CheckUrlCommand): Promise<CheckResult> {
        try {
            await axios.get(command.url);
            return new CheckResult(CheckStatus.OK, `URL ${command.url} is reachable`)
        } catch (error: any) {
            console.error(`${command.messagePrefix} Error fetching URL: ${error.message}`);
            return new CheckResult(CheckStatus.ERROR, `URL ${command.url} is unreachable`)
        }
    }
}