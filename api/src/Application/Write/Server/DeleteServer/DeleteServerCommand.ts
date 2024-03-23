import Command from "../../../../Domain/Command/Command";

export default class DeleteServerCommand implements Command {
    constructor(
        public readonly id: number
    ) {}
}
