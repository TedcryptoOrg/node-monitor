import {ApiConfiguration} from "./ApiConfiguration";
import {ApiServer} from "./ApiServer";

export type ApiMetric = {
    configuration: ApiConfiguration,
    server: ApiServer,
    freeDiskSpace: number;
    usedDiskSpace: number;
    totalDiskSpace: number;
    usedDiskSpacePercentage: number;
    memoryUsage: number;
    memoryUsagePercentage: number;
    totalMemory: number;
}