import CommandHandler from "../../../../Domain/Command/CommandHandler";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import MonitorRepository from "../../../../Domain/Monitor/MonitorRepository";
import FindFailedCommand from "./FindFailedCommand";
import Monitor from "../../../../Domain/Monitor/Monitor";

@injectable()
export default class FindFailedCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.MonitorRepository) private monitorRepository: MonitorRepository
    ) {
    }

    async handle(command: FindFailedCommand): Promise<Monitor[]> {
        return this.monitorRepository.findFailed(command.limit, command.offset);
    }
}