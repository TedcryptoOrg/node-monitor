import {inject, injectable} from "inversify";
import {PrismaClient} from "@prisma/client";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import ConfigurationRepository from "../../../Domain/Configuration/ConfigurationRepository";
import Configuration, {ConfigurationArray} from "../../../Domain/Configuration/Configuration";

@injectable()
export default class OrmConfigurationRepository implements ConfigurationRepository {
    constructor(
        @inject(TYPES.OrmClient) private ormClient: PrismaClient,
    ) {
    }

    async get(id: number): Promise<Configuration> {
        return Configuration.fromArray(await this.ormClient.configurations.findUnique({
            where: {id: id}
        }) as ConfigurationArray);
    }

    async findAll(): Promise<Configuration[]> {
        return (await this.ormClient.configurations.findMany())
            .map((configuration: any) => Configuration.fromArray(configuration as ConfigurationArray));
    }

    async upsert(configuration: Configuration): Promise<Configuration> {
        const data: ConfigurationArray = {
            name: configuration.name,
            chain: configuration.chain,
            is_enabled: configuration.is_enabled,
        }

        if (configuration.id) {
            return Configuration.fromArray(
                await this.ormClient.configurations.update({
                    where: {id: configuration.id},
                    data: data
                })
            );
        }

        return Configuration.fromArray(
            await this.ormClient.configurations.create({
                data: {
                    ...data,
                    ...{createdAt: new Date(), updatedAt: new Date()}
                }
            })
        );
    }

    async delete(id: number): Promise<void> {
        await this.ormClient.configurations.delete({
            where: {id: id}
        });
    }
}
