import Audit from "../../../Domain/Audit/Audit";
import AuditRepository from "../../../Domain/Audit/AuditRepository";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import {PrismaClient} from "@prisma/client";

@injectable()
export default class OrmAuditRepository implements AuditRepository {
    constructor(
        @inject(TYPES.OrmClient) private ormClient: PrismaClient,
    ) {
    }

    async create(audit: Audit): Promise<Audit> {
        return Audit.fromArray(await this.ormClient.audit.create({
            data: {
                message: audit.message,
                created_at: new Date(),
                ...(audit.configuration ? {configuration: {connect: {id: audit.configuration.id}}} : {}),
                //...(audit.monitor ? {monitor: {connect: {id: audit.monitor.id}}} : {}),
                //...(audit.server ? {server: {connect: {id: audit.server.id}}} : {}),
            }
        }))
    }

    async findLatest(page: number, numRecords: number, limit: number): Promise<Audit[]> {
        const data = await this.ormClient.audit.findMany(
            {
                take: limit,
                skip: (page - 1) * numRecords,
                orderBy: {
                    created_at: 'desc'
                },
            });

        throw new Error('Method not implemented.');
    }

}