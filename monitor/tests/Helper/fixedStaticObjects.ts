import Configuration from "../../src/Domain/Configuration/Configuration";
import Server from "../../src/Domain/Server/Server";
import DiskSpaceCheckMonitor from "../../src/Domain/Monitor/DiskSpaceCheckMonitor";
import {MonitorType} from "../../src/Domain/Monitor/MonitorType";
import TestOnceMonitor from "./Monitor/TestOnceMonitor";
import UrlMonitor from "../../src/Domain/Monitor/UrlMonitor";
import SignMissMonitor from "../../src/Domain/Monitor/SignMissMonitor";
import Monitor from "../../src/Domain/Monitor/Monitor";
import Service from "../../src/Domain/Services/Service";
import {ServiceType} from "../../src/Domain/Services/ServiceType";
import BlockCheckMonitor from "../../src/Domain/Monitor/BlockCheckMonitor";
import OracleSignMissMonitor from "../../src/Domain/Monitor/OracleSignMissMonitor";

export const createConfiguration = (monitors?: Monitor[], servers?: Server[]): Configuration => {
    return new Configuration(
        1,
        "Test Configuration",
        'test',
        monitors ?? [],
        servers ?? [],
        true
    )
}

export const createServer = (services?: Service[]): Server => {
    return new Server(
        1,
        "Test Server",
        "http://localhost",
        services ?? [],
    )
}

export const createService = (): Service => {
    return new Service(
        1,
        ServiceType.REST,
        "Test Service",
        true,
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
        1
    )
}

export const createSignMissMonitor = (configuration?: Configuration): SignMissMonitor => {
    return new SignMissMonitor(
        1,
        'Test monitor',
        MonitorType.SIGN_MISS_CHECK,
        configuration ?? createConfiguration(),
        1,
        60,
        true,
        1,
        60,
        'test'
    )
}

export const createBlockCheckMonitor = (configuration?: Configuration): BlockCheckMonitor => {
    return new BlockCheckMonitor(
        1,
        'Test monitor',
        MonitorType.BLOCK_CHECK,
        configuration ?? createConfiguration(),
        1,
        60,
        true,
        createServer(),
        1,
        60,
    )
}

export const createOracleSignMissMonitor = (configuration?: Configuration): OracleSignMissMonitor => {
    return new OracleSignMissMonitor(
        1,
        'Test monitor',
        MonitorType.PRICE_FEEDER_MISS_COUNT,
        configuration ?? createConfiguration(),
        1,
        60,
        true,
        1,
        60,
        'test'
    )
}
