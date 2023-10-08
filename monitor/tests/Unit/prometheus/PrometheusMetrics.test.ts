import fs from "fs";
import path from "path";
import {PrometheusMetrics} from "../../../src/prometheus/prometheusMetrics";
import {formatBytes} from "../../../src/util/sizeTools";

describe('prometheus metric', () => {
    it('should create a prometheus metric and return some metrics', () => {
        const content = fs.readFileSync(path.join(__dirname, '../../Fixture/prometheus_metrics.txt'), 'utf8');
        const metrics = PrometheusMetrics.withMetricsContent(content);

        expect(formatBytes(metrics.getFreeDiskSpace())).toBe('344.36 GB');
        expect(formatBytes(metrics.getUsedDiskSpace())).toBe('552.65 GB');
        expect(formatBytes(metrics.getTotalDiskSpace())).toBe('897.01 GB');
        expect(metrics.getUsedDiskSpacePercentage()).toBe(61.61);
    });
});