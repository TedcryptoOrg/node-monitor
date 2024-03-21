import {inject, injectable} from "inversify";
import CommandHandler from "../../../../Domain/Command/CommandHandler";
import FindAllMonitorsCommand from "./FindAllMonitorsCommand";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import MonitorRepository from "../../../../Domain/Monitor/MonitorRepository";
import Monitor from "../../../../Domain/Monitor/Monitor";

@injectable()
export default class FindAllMonitorsCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.MonitorRepository) private repository: MonitorRepository
    ) {
    }

    handle(command: FindAllMonitorsCommand): Promise<Monitor[]> {
        return this.repository.findAll();
    }

}