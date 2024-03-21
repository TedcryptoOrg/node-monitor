import CommandHandler from "../../../../Domain/Command/CommandHandler";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import GetServerCommand from "./GetServerCommand";
import ServerRepository from "../../../../Domain/Server/ServerRepository";
import Server from "../../../../Domain/Server/Server";

@injectable()
export default class GetServerCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.ServerRepository) private repository: ServerRepository
    ) {}

    async handle(command: GetServerCommand): Promise<Server> {
        return this.repository.get(command.id);
    }
}
