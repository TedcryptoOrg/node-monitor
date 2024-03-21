import {inject, injectable} from "inversify";
import CommandHandler from "../../../../Domain/Command/CommandHandler";
import FindAllServerCommand from "./FindAllServerCommand";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import ServerRepository from "../../../../Domain/Server/ServerRepository";
import Server from "../../../../Domain/Server/Server";

@injectable()
export default class FindAllServerCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.ServerRepository) private repository: ServerRepository
    ) {
    }

    handle(command: FindAllServerCommand): Promise<Server[]> {
        return this.repository.findAll();
    }

}