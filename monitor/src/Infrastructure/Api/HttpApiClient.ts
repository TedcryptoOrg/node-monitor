import ApiClient, {ServerMetricsResponse} from "../../Domain/ApiClient";
import TedcryptoApiClient from "./Tedcrypto/TedcryptoApiClient";
import {inject, injectable} from "inversify";
import Configuration from "../../Domain/Configuration/Configuration";
import Server from "../../Domain/Server/Server";
import Monitor from "../../Domain/Monitor/Monitor";
import {
    ApiMonitor,
    NodeExporterDiskSpaceUsageConfiguration,
    SignMissCheckConfiguration,
    UrlCheckConfiguration
} from "./Tedcrypto/Types/ApiMonitor";
import {ApiMonitorTypeEnum} from "./Tedcrypto/Types/ApiMonitorTypeEnum";
import DiskSpaceCheckMonitor from "../../Domain/Monitor/DiskSpaceCheckMonitor";
import {MonitorType} from "../../Domain/Monitor/MonitorType";
import {ApiConfiguration} from "./Tedcrypto/Types/ApiConfiguration";
import UrlMonitor from "../../Domain/Monitor/UrlMonitor";
import SignMissMonitor from "../../Domain/Monitor/SignMissMonitor";
import {ApiServer} from "./Tedcrypto/Types/ApiServer";
import {ApiService} from "./Tedcrypto/Types/ApiService";
import Service from "../../Domain/Services/Service";
import {ServiceType} from "../../Domain/Services/ServiceType";

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
            const configuration = this.parseConfiguration(apiConfiguration)

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

    async getConfigurationServers(configurationId:number): Promise<Server[]> {
        return (await this.provider.getConfigurationServers(configurationId)).map(this.parseServer);
    }

    private parseConfiguration(apiConfiguration: ApiConfiguration): Configuration {
        return new Configuration(
            apiConfiguration.id,
            apiConfiguration.name,
            apiConfiguration.chain,
            [],
            apiConfiguration.servers ? apiConfiguration.servers.map(this.parseServer) : [],
            apiConfiguration.is_enabled
        )
    }

    private parseMonitor(configuration: Configuration, monitor: ApiMonitor): Monitor {
        switch (monitor.type) {
            case ApiMonitorTypeEnum.NODE_EXPORTER_DISK_SPACE: {
                if (monitor.server === undefined) {
                    throw Error(`[Configuration: ${configuration.name}(${configuration.id})] Monitor ${monitor.name} has no server associated with it`)
                }
                const monitorConfig = JSON.parse(monitor.configuration_object) as NodeExporterDiskSpaceUsageConfiguration;

                return new DiskSpaceCheckMonitor(
                    Number(monitor.id),
                    configuration,
                    monitor.name,
                    MonitorType.DISK_SPACE_CHECK,
                    this.parseServer(monitor.server),
                    monitorConfig.threshold,
                    monitorConfig.alert_sleep_duration_minutes,
                    monitorConfig.check_interval_seconds,
                    60, // TODO: hardcoded value,
                    monitor.is_enabled
                )
            } case ApiMonitorTypeEnum.URL_CHECK: {
                const monitorConfig = JSON.parse(monitor.configuration_object) as UrlCheckConfiguration;

                return new UrlMonitor(
                    Number(monitor.id),
                    monitor.name,
                    MonitorType.URL_CHECK,
                    configuration,
                    Number(monitorConfig.alert_sleep_duration_minutes ?? 10),
                    60, // TODO: hardcoded value
                    monitor.is_enabled,
                    monitorConfig.address
                )
            } case ApiMonitorTypeEnum.SIGN_MISS_CHECK: {
                const monitorConfig = JSON.parse(monitor.configuration_object) as SignMissCheckConfiguration;

                return new SignMissMonitor(
                    Number(monitor.id),
                    monitor.name,
                    MonitorType.SIGN_MISS_CHECK,
                    configuration,
                    monitorConfig.alert_sleep_duration_minutes,
                    monitorConfig.sleep_duration_seconds,
                    monitor.is_enabled,
                    monitorConfig.miss_tolerance,
                    monitorConfig.miss_tolerance_period_seconds,
                    monitorConfig.valoper_address
                )
            } default:
                throw new Error(`Unsupported monitor type: ${monitor.type}`)
        }
    }

    private parseServer(server: ApiServer): Server {
        return new Server(
            Number(server.id),
            server.name,
            server.address,
            server.services?.map((service: ApiService) => this.parseService(service)) ?? []
        )
    }

    private parseService(service: ApiService): Service {
        return new Service(
            Number(service.id),
            service.type.toString() as ServiceType,
            service.name,
            service.is_enabled,
            service.address
        )
    }

    private async getConfigurationMonitors(configuration: Configuration): Promise<Monitor[]> {
        return (await this.provider.getConfigurationMonitors(configuration.id)).map((monitor: ApiMonitor) => {
            return this.parseMonitor(configuration, monitor)
        });
    }
}
