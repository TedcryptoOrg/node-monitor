import CommandHandler from "../../../Domain/Command/CommandHandler";
import PingHealthcheckCommand from "./PingHealthcheckCommand";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import {HttpClient} from "../../../Domain/Http/HttpClient";

@injectable()
export default class PingHealthcheckCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.HttpClient) private readonly httpClient: HttpClient
    ) {
    }
    async handle(command: PingHealthcheckCommand): Promise<void> {
        try {
            await this.httpClient.get(`${command.healthCheckUrl}/ping`);
        } catch (error) {
            console.error('Health check ping failed', error);
        }
    }
}
