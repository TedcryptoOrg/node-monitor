import {AlertChannel} from "../../../AlertChannel/alertChannel";
import {ApiMonitor, NodeExporterDiskSpaceUsageConfiguration} from "../../../Infrastructure/Api/Tedcrypto/Types/ApiMonitor";
import {ApiMetric} from "../../../Infrastructure/Api/Tedcrypto/Types/ApiMetric";
import {NoRecoverableException} from "../../../Domain/NoRecoverableException";
import {ApiServer} from "../../../Infrastructure/Api/Tedcrypto/Types/ApiServer";
import {sleep} from "../../../Application/Shared/sleep";
import {MonitorCheck} from "../monitorCheck";

export class DiskSpace extends MonitorCheck {

    constructor (
        monitor: ApiMonitor,
        alertChannels: AlertChannel[]
    ) {
        super(monitor, alertChannels)
    }

    async check (): Promise<void> {
        const configuration = this.configuration as NodeExporterDiskSpaceUsageConfiguration;
        while(true) {
            console.log(`🏃️${this.getMessagePrefix()} Running check...`)

            if (!this.monitor.server?.id) {
                await this.fail('Server id unknown. Cannot run check')

                throw new NoRecoverableException(`${this.getMessagePrefix()} Server id unknown. Cannot run check`)
            }

            const metrics = await this.fetchMetrics(this.monitor.server);

            console.log(`${this.getMessagePrefix()} Used disk space: ${metrics.usedDiskSpacePercentage}%`);

            if (metrics.usedDiskSpacePercentage >= configuration.threshold) {
                await this.fail(`Used disk space is ${metrics.usedDiskSpacePercentage}% above threshold ${configuration.threshold}`)
            } else {
                await this.success(`Used disk space is ${metrics.usedDiskSpacePercentage}% below threshold ${configuration.threshold}`)
            }

            await new Promise(resolve => setTimeout(resolve, 1000 * configuration.check_interval_seconds));
        }
    }

    private async fetchMetrics(server: ApiServer, attempts: number = 0): Promise<ApiMetric>
    {
        try {
            const metricsResponse = await fetch(`${process.env.API_HOST}/api/servers/${server.id}/metrics`);

            return await metricsResponse.json();
        } catch (exception: any) {
            console.error(exception);

            if (attempts >= 5) {
                await this.warning(`Error fetching metrics. Error: ${exception.message}`)
                throw new NoRecoverableException(`${this.getMessagePrefix()} Error fetching metrics. Error: ${exception.message}`);
            }

            attempts = attempts + 1;
            await sleep(2000 * attempts);

            return await this.fetchMetrics(server, attempts);
        }
    }
}