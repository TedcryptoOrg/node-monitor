import CommandHandler from "../../../Domain/Command/CommandHandler";
import CheckUrlCommand from "./CheckUrlCommand";
import CheckResult from "../CheckResult";
import {CheckStatus} from "../../../Domain/Checker/CheckStatusEnum";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import {HttpClient} from "../../../Domain/Http/HttpClient";
import {AxiosError} from "axios";

@injectable()
export default class CheckUrlCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.HttpClient) private readonly httpClient: HttpClient,
    ) {
    }

    async handle(command: CheckUrlCommand): Promise<CheckResult> {
        try {
            console.debug('Checking URL:', command.url)
            await this.httpClient.get(command.url, {timeout: 5000});
        } catch (error: any) {
            const axiosError = error as AxiosError;
            if (axiosError.code === 'ECONNABORTED' || !axiosError.response) {
                return new CheckResult(CheckStatus.ERROR, `URL ${command.url} is unreachable`)
            }
        }

        return new CheckResult(CheckStatus.OK, `URL ${command.url} is reachable`)
    }
}