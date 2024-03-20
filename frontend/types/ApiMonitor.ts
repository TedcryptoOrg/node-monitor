import {MonitorTypeEnum} from "./MonitorTypeEnum";
import {ApiConfiguration} from "./ApiConfiguration";
import {ApiServer} from "./ApiServer";

export type BlockAlertConfiguration = {
    miss_tolerance: number
    miss_tolerance_period_seconds: number
    sleep_duration_seconds: number
    alert_sleep_duration_minutes: number
}


export type NodeExporterDiskSpaceUsageConfiguration = {
    threshold: number
    alert_sleep_duration_minutes: number
    check_interval_seconds: number
}

export type PriceFeederMissCountConfiguration = {
    miss_tolerance: number
    miss_tolerance_period_seconds: number
    sleep_duration_seconds: number
    alert_sleep_duration_minutes: number
    valoper_address: string
}

export type UrlCheckConfiguration = {
    name: string,
    address: string,
}

export type SignMissCheckConfiguration = {
    miss_tolerance: number
    miss_tolerance_period_seconds: number
    sleep_duration_seconds: number
    alert_sleep_duration_minutes: number
    valoper_address: string
}

export type ApiMonitorInput = {
    id?: number,
    name: string,
    type: MonitorTypeEnum,
    is_enabled: boolean,
    configuration_id: number,
    server_id?: number,
    configuration_object: string,
    status?: boolean,
    last_check?: Date,
    last_error?: string,
}

export type ApiMonitor = {
    id?: number,
    name: string,
    type: MonitorTypeEnum,
    is_enabled: boolean,
    configuration: ApiConfiguration,
    server: ApiServer|undefined,
    configuration_object: string,
    status?: boolean,
    last_check?: Date,
    last_error?: string,
}
