import Command from "../../../../Domain/Command/Command";

export default class DeleteCompanyCommand implements Command {
    constructor(
        public id: number
    ) {
    }
}