import CommandHandler from "../../../Domain/Command/CommandHandler";
import PingHealthcheckCommand from "./PingHealthcheckCommand";
import axios from "axios";
import {injectable} from "inversify";

@injectable()
export default class PingHealthcheckCommandHandler implements CommandHandler {
    async handle(command: PingHealthcheckCommand): Promise<void> {
        try {
            await axios.get(`${command.healthCheckUrl}/ping`);
        } catch (error) {
            console.error('Health check ping failed', error);
        }
    }
}
