import {ApiConfiguration} from "./ApiConfiguration";
import {ApiServer} from "./ApiServer";

export interface ServerMetric {
    configuration: ApiConfiguration,
    server: ApiServer,
    freeDiskSpace: number|null;
    usedDiskSpace: number|null;
    totalDiskSpace: number|null;
    usedDiskSpacePercentage: number|null;
    memoryUsage: number|null;
    memoryUsagePercentage: number|null;
    totalMemory: number|null;
}