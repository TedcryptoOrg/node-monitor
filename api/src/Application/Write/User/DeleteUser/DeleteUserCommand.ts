import Command from "../../../../Domain/Command/Command";

export default class DeleteUserCommand implements Command {
    constructor(
        public id: number
    ) {
    }
}