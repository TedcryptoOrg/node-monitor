import Command from "../../../../Domain/Command/Command";

export default class FindFailedCommand implements Command {
    constructor(
        public readonly limit: number,
        public readonly offset: number
    ) {
    }
}
