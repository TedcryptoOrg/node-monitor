import Command from "../../../../Domain/Command/Command";

export default class GetCompanyCommand implements Command {
    constructor(public id: number) {}
}
