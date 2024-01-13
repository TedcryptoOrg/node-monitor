import {ApiConfiguration} from "./ApiConfiguration";
import {ApiService} from "./ApiService";

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
    createdAt?: Date;
    updatedAt?: Date;
}
