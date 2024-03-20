import CommandHandler from "../../../../Domain/Command/CommandHandler";
import FindLatestCommand from "./FindLatestCommand";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import AuditRepository from "../../../../Domain/Audit/AuditRepository";

@injectable()
export default class FindLatestCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.AuditRepository) private auditRepository: AuditRepository,
    ) {}

    handle(command: FindLatestCommand): Promise<any> {
        return this.auditRepository.findLatest(command.page, command.numRecords, command.limit);
    }
}
