import ApiClient, { ServerMetricsResponse } from '../../Domain/ApiClient'
import TedcryptoApiClient from './Tedcrypto/TedcryptoApiClient'
import { inject, injectable } from 'inversify'
import Configuration from '../../Domain/Configuration/Configuration'
import Server from '../../Domain/Server/Server'
import Monitor from '../../Domain/Monitor/Monitor'
import {
  ApiMonitor, BlockAlertConfiguration,
  NodeExporterDiskSpaceUsageConfiguration,
  PriceFeederMissCountConfiguration,
  SignMissCheckConfiguration,
  UrlCheckConfiguration
} from './Tedcrypto/Types/ApiMonitor'
import { ApiMonitorTypeEnum } from './Tedcrypto/Types/ApiMonitorTypeEnum'
import DiskSpaceCheckMonitor from '../../Domain/Monitor/DiskSpaceCheckMonitor'
import { MonitorType } from '../../Domain/Monitor/MonitorType'
import { ApiConfiguration } from './Tedcrypto/Types/ApiConfiguration'
import UrlMonitor from '../../Domain/Monitor/UrlMonitor'
import SignMissMonitor from '../../Domain/Monitor/SignMissMonitor'
import { ApiServer } from './Tedcrypto/Types/ApiServer'
import { ApiService } from './Tedcrypto/Types/ApiService'
import Service from '../../Domain/Services/Service'
import { ServiceType } from '../../Domain/Services/ServiceType'
import OracleSignMissMonitor from '../../Domain/Monitor/OracleSignMissMonitor'
import BlockCheckMonitor from '../../Domain/Monitor/BlockCheckMonitor'
import { TYPES } from '../../Domain/DependencyInjection/types'
import { Logger } from 'winston'

@injectable()
export class HttpApiClient implements ApiClient {
  constructor (
    @inject(TedcryptoApiClient) private readonly provider: TedcryptoApiClient,
    @inject(TYPES.Logger) private readonly logger: Logger
  ) {
  }

  async getConfigurations (): Promise<Configuration[]> {
    const apiConfigurations = await this.provider.getConfigurations()

    const configurations = []
    for (const apiConfiguration of apiConfigurations) {
      const configuration = await this.parseConfiguration(apiConfiguration)

      configurations.push(configuration.withMonitors(await this.getConfigurationMonitors(configuration)))
    }

    return configurations
  }

  async getMonitor (monitorId: number): Promise<Monitor> {
    const apiMonitor = await this.provider.getMonitor(monitorId)

    return await this.parseMonitor(await this.parseConfiguration(apiMonitor.configuration), apiMonitor)
  }

  async getServer (serverId: number): Promise<Server> {
    return this.parseServer(await this.provider.getServer(serverId))
  }

  async getServerMetrics (serverId: number): Promise<ServerMetricsResponse> {
    return await this.provider.getServerMetrics(serverId)
  }

  async pingMonitor (id: number, payload: { last_error: string | null, status: boolean }): Promise<void> {
    await this.provider.pingMonitor(id, payload)
  }

  async getConfigurationServers (configurationId: number): Promise<Server[]> {
    return (await this.provider.getConfigurationServers(configurationId)).map(this.parseServer.bind(this))
  }

  private async parseConfiguration (apiConfiguration: ApiConfiguration): Promise<Configuration> {
    return new Configuration(
      apiConfiguration.id,
      apiConfiguration.name,
      apiConfiguration.chain,
      [],
      await this.getConfigurationServers(apiConfiguration.id),
      apiConfiguration.is_enabled
    )
  }

  private async parseMonitor (configuration: Configuration, monitor: ApiMonitor): Promise<Monitor> {
    switch (monitor.type) {
      case ApiMonitorTypeEnum.NODE_EXPORTER_DISK_SPACE: {
        if (monitor.server?.id === undefined) {
          throw Error(`[Configuration: ${configuration.name}(${configuration.id})] Monitor ${monitor.name} has no server associated with it`)
        }
        const monitorConfig = JSON.parse(monitor.configuration_object) as NodeExporterDiskSpaceUsageConfiguration

        return new DiskSpaceCheckMonitor(
          Number(monitor.id),
          configuration,
          monitor.name,
          MonitorType.DISK_SPACE_CHECK,
          await this.getServer(monitor.server.id),
          monitorConfig.threshold,
          monitorConfig.alert_sleep_duration_minutes,
          monitorConfig.check_interval_seconds,
          60, // TODO: hardcoded value,
          monitor.is_enabled
        )
      } case ApiMonitorTypeEnum.URL_CHECK: {
        const monitorConfig = JSON.parse(monitor.configuration_object) as UrlCheckConfiguration

        return new UrlMonitor(
          Number(monitor.id),
          monitor.name,
          MonitorType.URL_CHECK,
          configuration,
          Number(monitorConfig.alert_sleep_duration_minutes ?? 10),
          60, // TODO: hardcoded value
          monitor.is_enabled,
          monitorConfig.address,
          monitorConfig.allowed_attempts ?? 3
        )
      } case ApiMonitorTypeEnum.SIGN_MISS_CHECK: {
        const monitorConfig = JSON.parse(monitor.configuration_object) as SignMissCheckConfiguration

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
      } case ApiMonitorTypeEnum.PRICE_FEEDER_MISS_COUNT: {
        const monitorConfig = JSON.parse(monitor.configuration_object) as PriceFeederMissCountConfiguration

        return new OracleSignMissMonitor(
          Number(monitor.id),
          monitor.name,
          MonitorType.PRICE_FEEDER_MISS_COUNT,
          configuration,
          monitorConfig.alert_sleep_duration_minutes,
          monitorConfig.sleep_duration_seconds,
          monitor.is_enabled,
          monitorConfig.miss_tolerance,
          monitorConfig.miss_tolerance_period_seconds,
          monitorConfig.valoper_address
        )
      } case ApiMonitorTypeEnum.BLOCK_CHECK: {
        if (monitor.server?.id === undefined) {
          throw Error(`[Configuration: ${configuration.name}(${configuration.id})] Monitor ${monitor.name} has no server associated with it`)
        }

        const monitorConfig = JSON.parse(monitor.configuration_object) as BlockAlertConfiguration

        return new BlockCheckMonitor(
          Number(monitor.id),
          monitor.name,
          MonitorType.BLOCK_CHECK,
          configuration,
          monitorConfig.alert_sleep_duration_minutes,
          monitorConfig.sleep_duration_seconds,
          monitor.is_enabled,
          await this.getServer(monitor.server.id),
          monitorConfig.miss_tolerance,
          monitorConfig.miss_tolerance_period_seconds
        )
      }
    }
  }

  private parseServer (server: ApiServer): Server {
    if (server.services === undefined) {
      throw new Error('Server has no services')
    }

    return new Server(
      Number(server.id),
      server.name,
      server.address,
      server.services.map(this.parseService.bind(this))
    )
  }

  private parseService (service: ApiService): Service {
    return new Service(
      Number(service.id),
      service.type.toString() as ServiceType,
      service.name,
      service.is_enabled,
      service.address
    )
  }

  private async getConfigurationMonitors (configuration: Configuration): Promise<Monitor[]> {
    const returnMonitor = []
    for (const monitor of await this.provider.getConfigurationMonitors(configuration.id)) {
      returnMonitor.push(await this.parseMonitor(configuration, monitor))
    }

    return returnMonitor
  }
}
