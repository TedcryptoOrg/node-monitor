import CommandHandler from "../../../../Domain/Command/CommandHandler";
import ListAllUsersCommand from "./ListAllUsersCommand";
import {inject, injectable} from "inversify";
import UserRepository from "../../../../Domain/User/UserRepository";
import User from "../../../../Domain/User/User";
import {TYPES} from "../../../../Domain/DependencyInjection/types";

@injectable()
export default class ListAllUsersCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.UserRepository) private repository: UserRepository
    ){}

    async handle(command: ListAllUsersCommand): Promise<User[]> {
        return this.repository.findAll();
    }
}
