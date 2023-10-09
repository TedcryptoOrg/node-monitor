import {MonitorCheck} from "../monitorCheck";
import {AlertChannel} from "../../../AlertChannel/alertChannel";
import axios from "axios";
import {PrometheusMetrics} from "../../../prometheus/prometheusMetrics";
import {Alerter} from "../../../Alerter/alerter";
import {NodeExporterDiskSpaceUsageConfiguration} from "../../../type/config/nodeExporterDiskSpaceUsageConfiguration";

export class DiskSpace implements MonitorCheck {
    private readonly alerter: Alerter
    private readonly diskSpaceThreshold: number;
    private readonly checkIntervalSeconds: number;

    constructor (
        private readonly name: string,
        private readonly configuration: NodeExporterDiskSpaceUsageConfiguration,
        private readonly alertChannels: AlertChannel[]
    ) {
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
            console.log(`[${this.name}][DiskSpace] Running check...`)

            const prometheusMetrics = PrometheusMetrics.withMetricsContent(
                (await axios.get(this.configuration.address)).data
            )

            console.log(`[${this.name}][DiskSpace] Used disk space: ${prometheusMetrics.getUsedDiskSpacePercentage()}%`);

            if (prometheusMetrics.getUsedDiskSpacePercentage() >= this.diskSpaceThreshold) {
                await this.alerter.alert(`🚨 [${this.name}] Disk space usage is ${prometheusMetrics.getUsedDiskSpacePercentage()}%`);
            }

            await new Promise(resolve => setTimeout(resolve, 1000 * this.checkIntervalSeconds));
        }
    }

}