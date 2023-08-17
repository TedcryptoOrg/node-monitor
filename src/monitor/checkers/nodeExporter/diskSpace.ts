import {MonitorCheck} from "../monitorCheck";
import {AlertChannel} from "../../../AlertChannel/alertChannel";
import {NodeExporterConfiguration} from "../../../type/nodeExporterConfiguration";
import axios from "axios";
import {PrometheusMetrics} from "../../../prometheus/prometheusMetrics";
import {Alerter} from "../../../Alerter/alerter";

export class DiskSpace implements MonitorCheck {
    private readonly alerter: Alerter
    private readonly diskSpaceThreshold: number;
    private readonly checkIntervalSeconds: number;

    constructor (
        private readonly name: string,
        private readonly nodeExporterConfiguration: NodeExporterConfiguration,
        private readonly alertChannels: AlertChannel[]
    ) {
        if (this.nodeExporterConfiguration.alerts?.diskSpace === undefined) {
            throw new Error('Disk space alert is not configured');
        }
        if (!this.nodeExporterConfiguration.alerts.diskSpace.enabled) {
            throw new Error('Disk space alert is disabled');
        }

        this.alerter = new Alerter(
            this.name,
            'BlockCheck',
            this.alertChannels,
            this.nodeExporterConfiguration.alerts.diskSpace.alert_sleep_duration_minutes
        )

        this.checkIntervalSeconds = this.nodeExporterConfiguration.alerts.diskSpace.check_interval_seconds
        this.diskSpaceThreshold = this.nodeExporterConfiguration.alerts.diskSpace.threshold
    }

    async check (): Promise<void> {
        while(true) {
            console.log(`[${this.name}][DiskSpace] Running check...`)

            const prometheusMetrics = PrometheusMetrics.withMetricsContent(
                (await axios.get(this.nodeExporterConfiguration.address)).data
            )

            console.log(`[${this.name}][DiskSpace] Used disk space: ${prometheusMetrics.getUsedDiskSpacePercentage()}%`);

            if (prometheusMetrics.getUsedDiskSpacePercentage() >= this.diskSpaceThreshold) {
                await this.alerter.alert(`🚨 [${this.name}] Disk space usage is ${prometheusMetrics.getUsedDiskSpacePercentage()}%`);
            }

            await new Promise(resolve => setTimeout(resolve, 1000 * this.checkIntervalSeconds));
        }
    }

}