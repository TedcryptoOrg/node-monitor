import {ServiceTypeEnum} from "./ServiceTypeEnum";

export type ApiService = {
    id?: number,
    name: string,
    address: string,
    is_enabled: boolean,
    type: ServiceTypeEnum,
    server_id: number,
}
