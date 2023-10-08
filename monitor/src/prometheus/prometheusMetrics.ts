import parsePrometheusTextFormat from '../util/prometheusParser/parsePrometheus'

interface PrometheusMetric {
  name: string
  help: string
  type: string
  metrics: [{ value: string | number, labels: any }]
}

export class PrometheusMetrics {
  private constructor (
    private readonly metrics: [PrometheusMetric]
  ) {}

  static withMetricsContent (metrics: any): PrometheusMetrics {
    return new PrometheusMetrics(parsePrometheusTextFormat(metrics))
  }

  getFreeDiskSpace (): number {
    return this.metrics.filter(metric => metric.name === 'node_filesystem_avail_bytes')[0].metrics[0].value as number
  }

  getUsedDiskSpace (): number {
    return this.getTotalDiskSpace() - this.getFreeDiskSpace()
  }

  getTotalDiskSpace (): number {
    return this.metrics.filter(metric => metric.name === 'node_filesystem_size_bytes')[0].metrics[0].value as number
  }

  getUsedDiskSpacePercentage (): number {
    return Number((this.getUsedDiskSpace() / this.getTotalDiskSpace() * 100).toFixed(2))
  }
}
