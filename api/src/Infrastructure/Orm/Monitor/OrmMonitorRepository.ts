import {inject, injectable} from "inversify";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import Monitor from "../../../Domain/Monitor/Monitor";
import {PrismaClient} from "@prisma/client";
import MonitorRepository, {MonitorFindAllProps} from "../../../Domain/Monitor/MonitorRepository";
import RecordNotFound from "../../../Domain/RecordNotFound";

@injectable()
export default class OrmMonitorRepository implements MonitorRepository {
    constructor(
        @inject(TYPES.OrmClient) private ormClient: PrismaClient
    ) {
    }

    async get(id: number): Promise<Monitor> {
        const monitor = await this.ormClient.monitors.findUnique({
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
            ...(monitor.configuration && monitor.configuration.id !== undefined ? {configuration: {connect: {id: monitor.configuration.id}}} : {}),
            ...(monitor.server && monitor.server.id !== undefined ? {server: {connect: {id: monitor.server.id}}} : {}),
            last_check: monitor.lastCheck,
            status: monitor.status,
            last_error: monitor.lastError,
            errored_at: monitor.erroredAt,
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

        if (!monitor.configuration) {
            throw new Error('Configuration is required');
        }

        const monitorData = await this.ormClient.monitors.create({
            data: {
                ...data,
                configuration: {connect: {id: monitor.configuration.id}},
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

    async findAll(criteria?: MonitorFindAllProps): Promise<Monitor[]> {
        const monitors = await this.ormClient.monitors.findMany({
            where: criteria,
            include: {
                configuration: true,
                server: true
            }
        });

        return monitors.map(Monitor.fromArray);
    }

    async findFailed(limit: number, offset: number): Promise<Monitor[]> {
        const monitors = await this.ormClient.monitors.findMany({
            where: {
                status: false,
                is_enabled: true,
                configuration: {
                    is_enabled: true
                }
            },
            include: {
                configuration: true,
                server: true
            },
            orderBy: {
                last_check: 'desc'
            },
            take: limit,
            skip: offset
        });

        return monitors.map(Monitor.fromArray);
    }

    async findWarnings(limit: number, offset: number): Promise<Monitor[]> {
        const monitors = await this.ormClient.monitors.findMany({
            where: {
                status: true,
                is_enabled: true,
                last_error: {
                    not: null
                },
                configuration: {
                    is_enabled: true
                }
            },
            include: {
                configuration: true,
                server: true
            },
            orderBy: {
                last_check: 'desc'
            },
            take: limit,
            skip: offset
        });

        return monitors.map(Monitor.fromArray);
    }
}