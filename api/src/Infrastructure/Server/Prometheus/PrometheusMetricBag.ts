export interface PrometheusMetric {
  name: string
  help: string
  type: string
  metrics: [{ value: string | number, labels: any }]
}

export default class PrometheusMetricBag {
  constructor (
    private readonly metrics: PrometheusMetric[]
  ) {
  }

  getFreeDiskSpace (): number {
    const metrics = this.metrics.filter(metric => metric.name === 'node_filesystem_avail_bytes')

    // sum all metrics
    let total = 0
    metrics[0].metrics.forEach(metric => {
      total += Number(metric.value)
    })

    return total
  }

  getUsedDiskSpace (): number {
    return this.getTotalDiskSpace() - this.getFreeDiskSpace()
  }

  getTotalDiskSpace (): number {
    const metrics = this.metrics.filter(metric => metric.name === 'node_filesystem_size_bytes')

    // sum all metrics
    let total = 0
    metrics[0].metrics.forEach(metric => {
      total += Number(metric.value)
    })

    return total
  }

  getUsedDiskSpacePercentage (): number {
    return Number((this.getUsedDiskSpace() / this.getTotalDiskSpace() * 100).toFixed(2))
  }

  getMemoryUsage (): number {
    const metrics = this.metrics.filter(metric => metric.name === 'node_memory_MemAvailable_bytes')

    // sum all metrics
    let total = 0
    metrics[0].metrics.forEach(metric => {
      total += Number(metric.value)
    })

    return total
  }

  getMemoryUsagePercentage (): number {
    return Number((this.getMemoryUsage() / this.getTotalMemory() * 100).toFixed(2))
  }

  getTotalMemory (): number {
    const metrics = this.metrics.filter(metric => metric.name === 'node_memory_MemTotal_bytes')

    // sum all metrics
    let total = 0
    metrics[0].metrics.forEach(metric => {
      total += Number(metric.value)
    })

    return total
  }
}
