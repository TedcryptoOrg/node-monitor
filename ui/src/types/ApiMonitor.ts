import {MonitorTypeEnum} from "./MonitorTypeEnum";

export type BlockAlertConfiguration = {
    miss_tolerance: number
    miss_tolerance_period_seconds: number
    sleep_duration_seconds: number
    alert_sleep_duration_minutes: number
    rpc?: string
}


export type NodeExporterDiskSpaceUsageConfiguration = {
    address: string
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
    rest_address: string
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
    rpc?: string
    rest?: string
}

export type ApiMonitor = {
    id?: number,
    name: string,
    type: MonitorTypeEnum,
    is_enabled: boolean,
    configuration_id: number,
    configuration_object: string,
}
