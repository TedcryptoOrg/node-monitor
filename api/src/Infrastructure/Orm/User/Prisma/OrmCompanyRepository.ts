import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import RecordNotFound from "../../../../Domain/RecordNotFound";
import CompanyRepository from "../../../../Domain/User/CompanyRepository";
import Company from "../../../../Domain/User/Company";
import {TYPES} from "../../../../Domain/DependencyInjection/types";

@injectable()
export default class OrmCompanyRepository implements CompanyRepository {
    constructor(
        @inject(TYPES.OrmClient) private prismaClient: PrismaClient,
    ){
    }

    async findAll(): Promise<Company[]> {
        const companies: any[] = await this.prismaClient.company.findMany()

        return companies.map(company => Company.fromObject(company as any))
    }

    public async get(id: number): Promise<Company> {
        const company: any = await this.prismaClient.company.findUnique({
            where: {
                id: id
            },
        })

        if (!company) {
            throw new RecordNotFound(`Company with "${id}" id not found`)
        }

        return Company.fromObject(company as any)
    }

    async upsert(company: Company): Promise<Company> {
        if (company.id) {
            const data: any = await this.prismaClient.company.update({
                where: {
                    id: company.id
                },
                data: {
                    name: company.name,
                    is_active: company.is_active
                }
            })

            return Company.fromObject(data)
        }

        const data: any = await this.prismaClient.company.create({
            data: {
                name: company.name,
                is_active: company.is_active
            }
        })

        return Company.fromObject(data)
    }

    async delete(id: number): Promise<void> {
        await this.prismaClient.company.delete({
            where: {
                id: id
            }
        })
    }
}