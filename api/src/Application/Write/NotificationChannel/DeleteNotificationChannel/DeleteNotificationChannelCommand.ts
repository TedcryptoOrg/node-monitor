import Command from "../../../../Domain/Command/Command";

export default class DeleteNotificationChannelCommand implements Command {
    constructor(
        public readonly id: number
    ) {}
}
