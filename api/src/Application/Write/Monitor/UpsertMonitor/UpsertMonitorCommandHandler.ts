import CommandHandler from "../../../../Domain/Command/CommandHandler";
import UpsertMonitorCommand from "./UpsertMonitorCommand";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import AuditRepository from "../../../../Domain/Audit/AuditRepository";
import Audit from "../../../../Domain/Audit/Audit";
import ConfigurationRepository from "../../../../Domain/Configuration/ConfigurationRepository";
import MonitorRepository from "../../../../Domain/Monitor/MonitorRepository";
import Monitor from "../../../../Domain/Monitor/Monitor";
import ServerRepository from "../../../../Domain/Server/ServerRepository";

@injectable()
export default class UpsertMonitorCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.MonitorRepository) private monitorRepository: MonitorRepository,
        @inject(TYPES.ConfigurationRepository) private configurationRepository: ConfigurationRepository,
        @inject(TYPES.ServerRepository) private serverRepository: ServerRepository,
        @inject(TYPES.AuditRepository) private auditRepository: AuditRepository
    ) {
    }

    async handle(command: UpsertMonitorCommand): Promise<Monitor> {
        const configuration = command.configurationId ? await this.configurationRepository.get(command.configurationId) : null;
        const server = command.serverId ? await this.serverRepository.get(command.serverId) : null;

        const monitor = await this.monitorRepository.upsert(new Monitor(
            command.name,
            command.type,
            command.isEnabled,
            JSON.parse(command.configurationObject),
            command.id,
            configuration ?? undefined,
            server ?? undefined,
            command.lastCheck,
            command.status,
            command.lastError
        ));

        await this.auditRepository.create(new Audit(
            configuration,
            server,
            monitor,
            command.id
                ? `Monitor ${command.name} updated`
                : `Monitor ${command.name} created`,
        ))

        return monitor;
    }
}
