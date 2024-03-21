import CommandHandler from "../../../../Domain/Command/CommandHandler";
import {inject, injectable} from "inversify";
import UpsertNotificationChannelCommand from "./UpsertNotificationChannelCommand";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import NotificationChannelRepository from "../../../../Domain/NotificationChannel/NotificationChannelRepository";
import AuditRepository from "../../../../Domain/Audit/AuditRepository";
import NotificationChannel from "../../../../Domain/NotificationChannel/NotificationChannel";
import {NotificationChannelType} from "../../../../Domain/NotificationChannel/NotificationChannelType";
import Audit from "../../../../Domain/Audit/Audit";

@injectable()
export default class UpsertNotificationChannelCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.NotificationChannelRepository) private notificationChannelRepository: NotificationChannelRepository,
        @inject(TYPES.AuditRepository) private auditRepository: AuditRepository,
    ) {
    }

    async handle(command: UpsertNotificationChannelCommand): Promise<any> {
        // TODO: validate configuration object based on the type
        const notificationChannel = await this.notificationChannelRepository.upsert(
            new NotificationChannel(
                command.name,
                command.type as NotificationChannelType,
                JSON.parse(command.configurationObject),
                command.isEnabled,
                command.id
            )
        )

        await this.auditRepository.create(
            new Audit(
                null,
                null,
                null,
                `Notification channel ${notificationChannel.name} ${(command.id ? 'edited' : 'created')}`,
            )
        )
    }
}
