import Command from "../../../../Domain/Command/Command";

export default class UpsertNotificationChannelCommand implements Command {
    constructor(
        public readonly name: string,
        public readonly type: string,
        public readonly configurationObject: string,
        public readonly isEnabled: boolean,
        public readonly id?: number
    ) {
    }
}
