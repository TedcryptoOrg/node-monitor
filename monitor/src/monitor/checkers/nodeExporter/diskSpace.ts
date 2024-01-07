import {MonitorCheck} from "../monitorCheck";
import {AlertChannel} from "../../../AlertChannel/alertChannel";
import axios from "axios";
import {PrometheusMetrics} from "../../../prometheus/prometheusMetrics";
import {Alerter} from "../../../Alerter/alerter";
import {ApiMonitor, NodeExporterDiskSpaceUsageConfiguration} from "../../../type/api/ApiMonitor";
import {pingMonitor} from "../../../services/monitorsManager";

export class DiskSpace implements MonitorCheck {
    private readonly alerter: Alerter
    private readonly diskSpaceThreshold: number;
    private readonly checkIntervalSeconds: number;
    private readonly configuration: NodeExporterDiskSpaceUsageConfiguration;
    private isOkay: boolean = false;
    private lastTimePing: number = 0;
    private readonly pingInterval: number = 60;

    constructor (
        private readonly name: string,
        private readonly monitor: ApiMonitor,
        private readonly alertChannels: AlertChannel[]
    ) {
        this.configuration = JSON.parse(this.monitor.configuration_object) as NodeExporterDiskSpaceUsageConfiguration
        console.debug(`🔨️[${this.name}] Creating disk space check...`, this.configuration);

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

            const prometheusMetrics = PrometheusMetrics.withMetricsContent(
                (await axios.get(this.configuration.address)).data
            )

            console.log(`[${this.name}][DiskSpace] Used disk space: ${prometheusMetrics.getUsedDiskSpacePercentage()}%`);

            if (prometheusMetrics.getUsedDiskSpacePercentage() >= this.diskSpaceThreshold) {
                const message = `Used disk space is ${prometheusMetrics.getUsedDiskSpacePercentage()}% above threshold ${this.diskSpaceThreshold}`
                console.log(`🔴️[${this.name}][DiskSpace] ${message}`);
                this.isOkay = false;
                await this.alerter.alert(`🚨 [${this.name}] ${message}`);
                await pingMonitor(
                    this.monitor.id as number,
                    {
                        status: false,
                        last_error: message
                    });
            } else {
                if (!this.isOkay) {
                    await pingMonitor(this.monitor.id as number, {status: true, last_error: null})
                    this.isOkay = true;
                }
            }

            await new Promise(resolve => setTimeout(resolve, 1000 * this.checkIntervalSeconds));
        }
    }
}