import Command from "../../../../Domain/Command/Command";

export default class FindAllMonitorsCommand implements Command {
    constructor(
        public readonly configurationId?: number
    ) {
    }
}
