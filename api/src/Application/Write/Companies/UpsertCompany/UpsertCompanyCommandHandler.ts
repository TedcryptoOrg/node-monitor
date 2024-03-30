import CommandHandler from "../../../../Domain/Command/CommandHandler";
import {inject, injectable} from "inversify";
import UpsertCompanyCommand from "./UpsertCompanyCommand";
import CompanyRepository from "../../../../Domain/User/CompanyRepository";
import Company from "../../../../Domain/User/Company";
import {TYPES} from "../../../../Domain/DependencyInjection/types";

@injectable()
export default class UpsertCompanyCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.CompanyRepository) private repository: CompanyRepository
    ) {}

    async handle(command: UpsertCompanyCommand): Promise<void> {
        await this.repository.upsert(
            new Company(
                command.name,
                command.is_active,
                [],
                command.id
            )
        );
    }
}
