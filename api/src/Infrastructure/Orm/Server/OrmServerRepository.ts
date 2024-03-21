import Server from "../../../Domain/Server/Server";
import ServerRepository from "../../../Domain/Server/ServerRepository";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import {PrismaClient} from "@prisma/client";
import RecordNotFound from "../../../Domain/RecordNotFound";

@injectable()
export default class OrmServerRepository implements ServerRepository {
    constructor(
        @inject(TYPES.OrmClient) private ormClient: PrismaClient
    ) {
    }

    async get(id: number): Promise<Server> {
        const data = await this.ormClient.servers.findUnique({
            where: {
                id: id
            },
            include: {
                configuration: true
            }
        });
        if (!data) {
            throw new RecordNotFound(`Server with id ${id} not found`);
        }

        return Server.fromArray(data);
    }

    async upsert(server: Server): Promise<Server> {
        const data = {
            name: server.name,
            address: server.address,
            isEnabled: server.isEnabled,
            updatedAt: new Date(),
            ...(server.configuration && server.configuration.id ? {configuration: {connect: {id: server.configuration.id}}} : {})
        };
        if (server.id) {
            return Server.fromArray(await this.ormClient.servers.update({
                where: {
                    id: server.id
                },
                data: data,
                include: {
                    configuration: true
                }
            }));
        }
        if (server.configuration === undefined || server.configuration.id === undefined) {
            throw new Error('Configuration is required');
        }

        const result = await this.ormClient.servers.create({
            data: {
                ...data,
                configuration: {connect: {id: server.configuration.id}},
                createdAt: new Date(),
            },
            include: {
                configuration: true
            }
        });

        return Server.fromArray(result);
    }

    async delete(id: number): Promise<void> {
        this.ormClient.servers.delete({
            where: {
                id: id
            }
        });
    }

    async findAll(): Promise<Server[]> {
        const data = await this.ormClient.servers.findMany({
            include: {
                configuration: true
            }
        });

        return data.map((server) => Server.fromArray(server));
    }
}
