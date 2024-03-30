import Command from "../../../../Domain/Command/Command";
import {inject, injectable} from "inversify";
import DeleteCompanyCommand from "./DeleteCompanyCommand";
import CompanyRepository from "../../../../Domain/User/CompanyRepository";
import {TYPES} from "../../../../Domain/DependencyInjection/types";

@injectable()
export default class DeleteCompanyCommandHandler implements Command {
    constructor(
        @inject(TYPES.CompanyRepository) private repository: CompanyRepository
    ) {}

    async handle(command: DeleteCompanyCommand): Promise<void> {
        await this.repository.delete(command.id);
    }
}