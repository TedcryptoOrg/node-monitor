import ServerMetricsExporter from '../../Domain/Server/ServerMetricsExporter'
import { ServerMetrics } from '../../Domain/Server/ServerMetrics'
import { inject, injectable } from 'inversify'
import { PrometheusParser } from './Prometheus/PrometheusParser'

@injectable()
export default class ServerMetricsExplorerClient implements ServerMetricsExporter {
  constructor (
    @inject(PrometheusParser) private readonly prometheusParser: PrometheusParser
  ) {
  }

  async getMetrics (address: string): Promise<ServerMetrics> {
    const prometheusMetricsBag = await this.prometheusParser.parse(address)

    return {
      freeDiskSpace: prometheusMetricsBag.getFreeDiskSpace(),
      usedDiskSpace: prometheusMetricsBag.getUsedDiskSpace(),
      totalDiskSpace: prometheusMetricsBag.getTotalDiskSpace(),
      usedDiskSpacePercentage: prometheusMetricsBag.getUsedDiskSpacePercentage(),
      memoryUsage: prometheusMetricsBag.getMemoryUsage(),
      memoryUsagePercentage: prometheusMetricsBag.getMemoryUsagePercentage(),
      totalMemory: prometheusMetricsBag.getTotalMemory()
    }
  }
}
