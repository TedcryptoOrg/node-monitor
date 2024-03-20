import Command from "../../../../Domain/Command/Command";

export default class FindLatestCommand implements Command {
    constructor(
        public page: number,
        public numRecords: number,
        public limit: number
    ) {}
}