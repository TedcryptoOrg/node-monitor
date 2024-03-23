import Command from "../../../../Domain/Command/Command";

export default class DeleteMonitorCommand implements Command {
    constructor(
        public readonly id: number
    ) {}
}
