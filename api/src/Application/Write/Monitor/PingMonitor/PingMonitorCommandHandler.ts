import CommandHandler from "../../../../Domain/Command/CommandHandler";
import PingMonitorCommand from "./PingMonitorCommand";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import MonitorRepository from "../../../../Domain/Monitor/MonitorRepository";
import AuditRepository from "../../../../Domain/Audit/AuditRepository";
import Audit from "../../../../Domain/Audit/Audit";

@injectable()
export default class PingMonitorCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.MonitorRepository) private monitorRepository: MonitorRepository,
        @inject(TYPES.AuditRepository) private auditRepository: AuditRepository,
    ) {
    }

    async handle(command: PingMonitorCommand): Promise<void> {
        const monitor = await this.monitorRepository.get(command.id)

        await this.auditRepository.create(new Audit(
            monitor.configuration ?? null,
            monitor.server ?? null,
            monitor,
            `Monitor ${monitor.name} pinged. Status: ${command.status ? 'OK' : 'KO'}. Last error: ${command.lastError ?? 'none'}`,
        ))

        monitor.lastCheck = new Date()
        monitor.lastError = command.lastError
        monitor.status = command.status

        await this.monitorRepository.upsert(monitor)
    }
}
