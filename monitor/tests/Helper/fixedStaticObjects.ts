import Configuration from "../../src/Domain/Configuration/Configuration";
import Server from "../../src/Domain/Server/Server";
import DiskSpaceCheckMonitor from "../../src/Domain/Monitor/DiskSpaceCheckMonitor";
import {MonitorType} from "../../src/Domain/Monitor/MonitorType";
import TestOnceMonitor from "./Monitor/TestOnceMonitor";
import UrlMonitor from "../../src/Domain/Monitor/UrlMonitor";

export const createConfiguration = (): Configuration => {
    return new Configuration(
        1,
        "Test Configuration",
        [],
        [],
        true
    )
}

export const createServer = (): Server => {
    return new Server(
        1,
        "Test Server",
        "http://localhost",
    )
}

export const createDiskSpaceCheckMonitor = (): DiskSpaceCheckMonitor => {
    return new DiskSpaceCheckMonitor(
        1,
        createConfiguration(),
        'Test monitor',
        MonitorType.DISK_SPACE_CHECK,
        createServer(),
        80,
        1,
        60,
        1,
        true
    )
}

export const createTestOnceMonitor = (): TestOnceMonitor => {
    return new TestOnceMonitor(
        1,
        'Test monitor',
        MonitorType.DISK_SPACE_CHECK,
        createConfiguration(),
        1,
        true,
        10
    )
}

export const createUrlMonitor = (url?: string): UrlMonitor => {
    return new UrlMonitor(
        1,
        'Test monitor',
        MonitorType.URL_CHECK,
        createConfiguration(),
        1,
        60,
        true,
        url ?? 'http://localhost',
    )
}
