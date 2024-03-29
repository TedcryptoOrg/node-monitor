import {inject, injectable} from "inversify";
import RemoveAssociationWithNotificationChannelCommand from "./RemoveAssociationWithNotificationChannelCommand";
import CommandHandler from "../../../../Domain/Command/CommandHandler";
import ConfigurationNotificationRepository from "../../../../Domain/Configuration/ConfigurationNotificationRepository";
import {TYPES} from "../../../../Domain/DependencyInjection/types";

@injectable()
export default class RemoveAssociationWithNotificationChannelCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.ConfigurationNotificationRepository) private configurationNotificationRepository: ConfigurationNotificationRepository,
    ) {}

    async handle(command: RemoveAssociationWithNotificationChannelCommand): Promise<void> {
        await this.configurationNotificationRepository.delete(command.id);
    }
}
