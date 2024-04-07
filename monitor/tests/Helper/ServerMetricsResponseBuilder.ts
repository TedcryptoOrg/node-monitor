import {ServerMetricsResponse} from "../../src/Domain/ApiClient";

export default class ServerMetricsResponseBuilder {
    constructor(
        public freeDiskSpace: number = 0,
        public usedDiskSpace: number = 0,
        public totalDiskSpace: number = 0,
        public usedDiskSpacePercentage: number = 0,
        public memoryUsage: number = 0,
        public memoryUsagePercentage: number = 0,
        public totalMemory: number = 0,
    ) {
    }

    build(): ServerMetricsResponse {
        return {
            freeDiskSpace: this.freeDiskSpace,
            usedDiskSpace: this.usedDiskSpace,
            totalDiskSpace: this.totalDiskSpace,
            usedDiskSpacePercentage: this.usedDiskSpacePercentage,
            memoryUsage: this.memoryUsage,
            memoryUsagePercentage: this.memoryUsagePercentage,
            totalMemory: this.totalMemory,
        }
    }
}