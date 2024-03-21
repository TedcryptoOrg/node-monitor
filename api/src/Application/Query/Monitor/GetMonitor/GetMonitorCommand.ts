import Command from "../../../../Domain/Command/Command";

export default class GetMonitorCommand implements Command {
    constructor(
        public readonly id: number
    ) {}
}
