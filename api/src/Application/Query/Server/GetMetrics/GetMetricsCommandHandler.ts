import CommandHandler from "../../../../Domain/Command/CommandHandler";
import {inject, injectable} from "inversify";
import GetMetricsCommand from "./GetMetricsCommand";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import ServerRepository from "../../../../Domain/Server/ServerRepository";
import {ServiceNotFound} from "../../../../Domain/Service/ServiceNotFound";
import {ServiceType} from "../../../../Domain/Service/ServiceType";
import ServerMetricsExporter from "../../../../Domain/Server/ServerMetricsExporter";
import {ServerMetrics} from "../../../../Domain/Server/ServerMetrics";

@injectable()
export default class GetMetricsCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.ServerRepository) private serverRepository: ServerRepository,
        @inject(TYPES.ServerMetricsExporter) private serverMetricsExporter: ServerMetricsExporter,
    ) {
    }

    async handle(command: GetMetricsCommand): Promise<ServerMetrics> {
        const server = await this.serverRepository.get(command.serverId)

        const nodeExporter = server.services?.find(
            (service) => {
                const serviceJson = JSON.parse(JSON.stringify(service));
                return serviceJson.type === ServiceType.NODE_EXPORTER
            }
        )
        if (nodeExporter === undefined) {
            throw ServiceNotFound.withServer(ServiceType.NODE_EXPORTER, server)
        }

        const nodeExporterJson = JSON.parse(JSON.stringify(nodeExporter));

        return this.serverMetricsExporter.getMetrics(nodeExporterJson.address)
    }
}
