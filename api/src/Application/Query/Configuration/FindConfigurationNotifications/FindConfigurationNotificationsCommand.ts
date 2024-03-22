import Command from "../../../../Domain/Command/Command";

export default class FindConfigurationNotificationsCommand implements Command {
    constructor(
        public readonly configurationId: number
    ) {
    }
}
