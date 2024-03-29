import Command from "../../../../Domain/Command/Command";

export default class UpsertConfigurationCommand implements Command {
    constructor(
        public readonly name: string,
        public readonly chain: string,
        public readonly is_active: boolean,
        public readonly id?: number
    ) {}
}
