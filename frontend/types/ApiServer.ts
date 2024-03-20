import {ApiConfiguration} from "./ApiConfiguration";
import {ApiService} from "./ApiService";
import {ApiMonitor} from "./ApiMonitor";

export type ApiServerInput = {
    name: string,
    address: string,
    is_enabled: boolean,
    configuration_id: number,
}

export type ApiServer = {
    id?: number,
    name: string,
    address: string,
    is_enabled: boolean,
    configuration: ApiConfiguration,
    services: ApiService[],
    monitors?: ApiMonitor[]|undefined,
    created_at?: string;
    updated_at?: string;
}
