import {MonitorCheck} from "../monitorCheck";
import {AlertChannel} from "../../../AlertChannel/alertChannel";
import {Alerter} from "../../../Alerter/alerter";
import {ApiMonitor, NodeExporterDiskSpaceUsageConfiguration} from "../../../type/api/ApiMonitor";
import {pingMonitor} from "../../../services/monitorsManager";
import {ApiMetric} from "../../../type/api/ApiMetric";

export class DiskSpace implements MonitorCheck {
    private readonly alerter: Alerter
    private readonly diskSpaceThreshold: number;
    private readonly checkIntervalSeconds: number;
    private readonly configuration: NodeExporterDiskSpaceUsageConfiguration;
    private isOkay: boolean = false;
    private isFirstRun: boolean = true;

    constructor (
        private readonly name: string,
        private readonly monitor: ApiMonitor,
        private readonly alertChannels: AlertChannel[]
    ) {
        this.configuration = JSON.parse(this.monitor.configuration_object) as NodeExporterDiskSpaceUsageConfiguration
        console.debug(`🔨️[${this.name}][DiskSpace] Creating disk space check...`, this.configuration);

        this.alerter = new Alerter(
            this.name,
            'BlockCheck',
            this.alertChannels,
            this.configuration.alert_sleep_duration_minutes
        )

        this.checkIntervalSeconds = this.configuration.check_interval_seconds
        this.diskSpaceThreshold = this.configuration.threshold
    }

    async check (): Promise<void> {
        while(true) {
            console.log(`🏃️[${this.name}][DiskSpace] Running check...`)

            if (!this.monitor.server?.id) {
                await this.failed('Server id unknown. Cannot run check')

                throw new Error(`[${this.name}][DiskSpace] Server id unknown. Cannot run check`)
            }

            const metricsResponse = await fetch(`${process.env.API_HOST}/api/servers/${this.monitor.server.id}/metrics`);
            const metrics: ApiMetric = await metricsResponse.json();

            console.log(`[${this.name}][DiskSpace] Used disk space: ${metrics.usedDiskSpacePercentage}%`);

            if (metrics.usedDiskSpacePercentage >= this.diskSpaceThreshold) {
                await this.failed(`Used disk space is ${metrics.usedDiskSpacePercentage}% above threshold ${this.diskSpaceThreshold}`)
            } else {
                await this.success(`Used disk space is ${metrics.usedDiskSpace}% below threshold ${this.diskSpaceThreshold}`)
            }

            this.isFirstRun = false;
            await new Promise(resolve => setTimeout(resolve, 1000 * this.checkIntervalSeconds));
        }
    }

    async failed(message: string): Promise<void>
    {
        console.log(`🔴️[${this.name}][DiskSpace] ${message}`);
        this.isOkay = false;
        await this.alerter.alert(`🚨 [${this.name}][DiskSpace] ${message}`);
        await pingMonitor(
            this.monitor.id as number,
            {
                status: false,
                last_error: message
            });
    }

    async success(message: string): Promise<void>
    {
        if (!this.isOkay) {
            // Ping monitor saying all is fine now
            await pingMonitor(this.monitor.id as number, {status: true, last_error: null})
            this.isOkay = true;

            if (!this.isFirstRun) {
                await this.alerter.alert(`🟢️ [${this.name}] ${message}`);
            }
        }
    }
}