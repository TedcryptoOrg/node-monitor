import CommandHandler from "../../../../Domain/Command/CommandHandler";
import DeleteServiceCommand from "./DeleteServiceCommand";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import AuditRepository from "../../../../Domain/Audit/AuditRepository";
import Audit from "../../../../Domain/Audit/Audit";
import ServiceRepository from "../../../../Domain/Service/ServiceRepository";

@injectable()
export default class DeleteServiceCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.ServiceRepository) private repository: ServiceRepository,
        @inject(TYPES.AuditRepository) private auditRepository: AuditRepository
    ) {}

    async handle(command: DeleteServiceCommand): Promise<void> {
        await this.repository.delete(command.id);

        await this.auditRepository.create(
            new Audit(
                null,
                null,
                null,
                `Service ${command.id} deleted`
            )
        );
    }
}