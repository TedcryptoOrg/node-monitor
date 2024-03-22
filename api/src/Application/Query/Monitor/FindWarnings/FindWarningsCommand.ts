import Command from "../../../../Domain/Command/Command";

export default class FindWarningsCommand implements Command {
    constructor(
        public readonly limit: number,
        public readonly offset: number
    ) {
    }
}
