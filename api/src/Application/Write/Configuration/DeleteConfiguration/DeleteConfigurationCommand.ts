import Command from "../../../../Domain/Command/Command";

export default class DeleteConfigurationCommand implements Command {
    constructor(
        public readonly id: number
    ) {}
}
