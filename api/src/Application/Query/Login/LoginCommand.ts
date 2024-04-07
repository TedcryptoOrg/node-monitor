import Command from "../../../Domain/Command/Command";

export default class LoginCommand implements Command {
    constructor(
        public username: string,
        public password: string,
    ) {
    }
}