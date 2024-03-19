import * as serviceDal from "../../database/dal/service";
import axios from "axios";
import {PrometheusMetrics} from "../../services/prometheus/prometheusMetrics";
import {MetricType} from "../../type/prometheus/MetricType";
export const getMetrics = async (req: any, resp: any): Promise<void> => {
    const services = await serviceDal.findByServerId(req.params.id)
    const nodeExporter = services.find(
        (service) => {
            const serviceJson = JSON.parse(JSON.stringify(service));
            return serviceJson.type === 'node_exporter'
        }
    )
    if (nodeExporter === undefined) {
        resp.status(404).send({'message': 'Node exporter not found'})
        throw new Error('Node exporter not found')
    }

    const nodeExporterJson = JSON.parse(JSON.stringify(nodeExporter));
    const metrics = (await axios.get(nodeExporterJson.address)).data

    const prometheusMetrics = PrometheusMetrics.withMetricsContent(metrics);
    const metric: MetricType = {
        freeDiskSpace: prometheusMetrics.getFreeDiskSpace(),
        usedDiskSpace: prometheusMetrics.getUsedDiskSpace(),
        totalDiskSpace: prometheusMetrics.getTotalDiskSpace(),
        usedDiskSpacePercentage: prometheusMetrics.getUsedDiskSpacePercentage(),
        memoryUsage: prometheusMetrics.getMemoryUsage(),
        memoryUsagePercentage: prometheusMetrics.getMemoryUsagePercentage(),
        totalMemory: prometheusMetrics.getTotalMemory(),
    };

    return resp.send(metric)
}