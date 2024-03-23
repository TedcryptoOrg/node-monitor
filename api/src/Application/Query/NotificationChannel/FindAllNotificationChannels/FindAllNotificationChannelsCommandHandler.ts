import {inject, injectable} from "inversify";
import CommandHandler from "../../../../Domain/Command/CommandHandler";
import FindAllNotificationChannelsCommand from "./FindAllNotificationChannelsCommand";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import NotificationChannelRepository from "../../../../Domain/NotificationChannel/NotificationChannelRepository";
import NotificationChannel from "../../../../Domain/NotificationChannel/NotificationChannel";

@injectable()
export default class FindAllNotificationChannelsCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.NotificationChannelRepository) private repository: NotificationChannelRepository
    ) {
    }

    handle(command: FindAllNotificationChannelsCommand): Promise<NotificationChannel[]> {
        return this.repository.findAll(command.onlyActive);
    }

}