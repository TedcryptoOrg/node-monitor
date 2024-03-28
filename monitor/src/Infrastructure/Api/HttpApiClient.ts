import ApiClient, {ServerMetricsResponse} from "../../Domain/ApiClient";
import TedcryptoApiClient from "./Tedcrypto/TedcryptoApiClient";
import {inject, injectable} from "inversify";
import Configuration from "../../Domain/Configuration/Configuration";
import Server from "../../Domain/Server/Server";
import Monitor from "../../Domain/Monitor/Monitor";
import {ApiMonitor, NodeExporterDiskSpaceUsageConfiguration} from "./Tedcrypto/Types/ApiMonitor";
import {ApiMonitorTypeEnum} from "./Tedcrypto/Types/ApiMonitorTypeEnum";
import DiskSpaceCheckMonitor from "../../Domain/Monitor/DiskSpaceCheckMonitor";
import {MonitorType} from "../../Domain/Monitor/MonitorType";
import {ApiConfiguration} from "./Tedcrypto/Types/ApiConfiguration";

@injectable()
export class HttpApiClient implements ApiClient {
    constructor(
        @inject(TedcryptoApiClient) private readonly provider: TedcryptoApiClient
    ) {
    }

    async getConfigurations(): Promise<Configuration[]> {
        const apiConfigurations = await this.provider.getConfigurations();

        const configurations = []
        for (const apiConfiguration of apiConfigurations) {
            const configuration = new Configuration(
                apiConfiguration.id,
                apiConfiguration.name,
                [],
                apiConfiguration.servers ? apiConfiguration.servers.map((server) => {
                    return new Server(
                        Number(server.id),
                        server.name,
                        server.address,
                    )
                }) : [],
                apiConfiguration.is_enabled
            )

            configurations.push(configuration.withMonitors(await this.getConfigurationMonitors(configuration)))
        }

        return configurations
    }

    async getMonitor(monitorId: number): Promise<Monitor> {
        const apiMonitor = await this.provider.getMonitor(monitorId);

        return this.parseMonitor(this.parseConfiguration(apiMonitor.configuration), apiMonitor);
    }

    async getServerMetrics(serverId: number): Promise<ServerMetricsResponse> {
        return await this.provider.getServerMetrics(serverId);
    }

    async pingMonitor(id: any, payload: {last_error: string|null; status: boolean}): Promise<void> {
        await this.provider.pingMonitor(id, payload);
    }

    private parseConfiguration(apiConfiguration: ApiConfiguration): Configuration {
        return new Configuration(
            apiConfiguration.id,
            apiConfiguration.name,
            [],
            apiConfiguration.servers ? apiConfiguration.servers.map((server) => {
                return new Server(
                    Number(server.id),
                    server.name,
                    server.address,
                )
            }) : [],
            apiConfiguration.is_enabled
        )
    }

    private parseMonitor(configuration: Configuration, monitor: ApiMonitor): Monitor {
        switch (monitor.type) {
            case ApiMonitorTypeEnum.NODE_EXPORTER_DISK_SPACE:
                if (monitor.server === undefined) {
                    throw Error(`[Configuration: ${configuration.name}(${configuration.id})] Monitor ${monitor.name} has no server associated with it`)
                }
                const monitorConfig = JSON.parse(monitor.configuration_object) as NodeExporterDiskSpaceUsageConfiguration;

                return new DiskSpaceCheckMonitor(
                    Number(monitor.id),
                    configuration,
                    monitor.name,
                    MonitorType.DISK_SPACE_CHECK,
                    new Server(Number(monitor.server.id), monitor.server.name, monitor.server.address),
                    monitorConfig.threshold,
                    monitorConfig.alert_sleep_duration_minutes,
                    monitorConfig.check_interval_seconds,
                    60, // TODO: hardcoded value,
                    monitor.is_enabled
                )
            default:
                throw new Error(`Unsupported monitor type: ${monitor.type}`)
        }
    }

    private async getConfigurationMonitors(configuration: Configuration): Promise<Monitor[]> {
        return (await this.provider.getConfigurationMonitors(configuration.id)).map((monitor: ApiMonitor) => {
            return this.parseMonitor(configuration, monitor)
        });
    }
}
