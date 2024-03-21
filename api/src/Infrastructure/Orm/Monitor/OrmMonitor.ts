import {inject, injectable} from "inversify";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import Monitor from "../../../Domain/Monitor/Monitor";
import {PrismaClient} from "@prisma/client";
import MonitorRepository from "../../../Domain/Monitor/MonitorRepository";
import RecordNotFound from "../../../Domain/RecordNotFound";

@injectable()
export default class OrmMonitor implements MonitorRepository {
    constructor(
        @inject(TYPES.OrmClient) private ormClient: PrismaClient
    ) {
    }

    async get(id: number): Promise<Monitor> {
        const monitor = this.ormClient.monitors.findUnique({
            where: {
                id: id
            },
            include: {
                configuration: true,
                server: true
            }
        });
        if (!monitor) {
            throw new RecordNotFound(`Monitor with id ${id} not found`);
        }

        return Monitor.fromArray(monitor);
    }

    async upsert(monitor: Monitor): Promise<Monitor> {
        const data = {
            name: monitor.name,
            type: monitor.type,
            is_enabled: monitor.isEnabled,
            configuration_object: JSON.stringify(monitor.configurationObject),
            ...(monitor.configuration ? {configuration: {connect: {id: monitor.configuration.id}}} : {}),
            ...(monitor.server ? {server: {connect: {id: monitor.server.id}}} : {}),
            last_check: monitor.lastCheck,
            status: monitor.status,
            last_error: monitor.lastError,
            updatedAt: new Date()
        };
        if (monitor.id) {
            const monitorData = await this.ormClient.monitors.update(
                {
                    where: {id: monitor.id},
                    data: data,
                    include: {
                        configuration: true,
                        server: true
                    }
                },
            )

            return Monitor.fromArray(monitorData);
        }

        const monitorData = await this.ormClient.monitors.create({
            data: {
                ...data,
                createdAt: new Date(),
            },
            include: {
                configuration: true,
                server: true
            }
        });

        return Monitor.fromArray(monitorData);
    }

    async delete(id: number): Promise<void> {
        await this.ormClient.monitors.delete({
            where: {
                id: id
            }
        });
    }

    async findAll(): Promise<Monitor[]> {
        const monitors = await this.ormClient.monitors.findMany({
            include: {
                configuration: true,
                server: true
            }
        });

        return monitors.map(Monitor.fromArray);
    }
}