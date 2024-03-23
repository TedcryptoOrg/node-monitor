import Command from "../../../../Domain/Command/Command";

export default class GetConfigurationCommand implements Command {
    constructor(
        public readonly id: number
    ) {}
}
