import {MonitorCheck} from "../monitorCheck";
import {AlertChannel} from "../../../AlertChannel/alertChannel";
import {NodeExporterConfiguration} from "../../../type/nodeExporterConfiguration";
import axios from "axios";
import parsePrometheusTextFormat from "../../../util/prometheusParser/parsePrometheus";

export class DiskSpace implements MonitorCheck {
    constructor (
        private readonly name: string,
        private readonly nodeExporterConfiguration: NodeExporterConfiguration,
        private readonly alertChannels: AlertChannel[]
    ) {
    }

    async check (): Promise<void> {
// TODO
    }

    async parseMetrics(): Promise<any> {
        // fetch from node exporter metrics
        const metrics = (await axios.get(this.nodeExporterConfiguration.address)).data;

        return parsePrometheusTextFormat(metrics);
    }

    async fetchDiskSpace (): Promise<number> {

    }

}