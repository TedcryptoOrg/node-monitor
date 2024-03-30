import Command from "../../../../Domain/Command/Command";

export default class UpsertCompanyCommand implements Command {
    constructor(
        public id: number|undefined,
        public name: string,
        public is_active: boolean
    ) {}
}
