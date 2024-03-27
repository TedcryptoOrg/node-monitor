import Configuration, {ConfigurationArray} from "../Configuration/Configuration";
import Server, {ServerArray} from "../Server/Server";
import {MonitorType} from "./MonitorType";

export type MonitorArray = {
    name: string,
    type: string,
    is_enabled: boolean,
    configuration_object: string,
    id?: number,
    configuration?: ConfigurationArray,
    server?: ServerArray|null,
    last_check?: Date|null,
    status?: boolean,
    last_error?: string|null,
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Monitor {
    constructor(
        public name: string,
        public type: MonitorType,
        public isEnabled: boolean,
        public configurationObject: object,
        public id?: number,
        public configuration?: Configuration,
        public server?: Server,
        public lastCheck?: Date|null,
        public status?: boolean,
        public lastError?: string|null,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {
    }

    static fromArray(array: MonitorArray): Monitor {
        return new Monitor(
            array.name,
            array.type as MonitorType,
            array.is_enabled,
            JSON.parse(array.configuration_object),
            array.id,
            array.configuration ? Configuration.fromArray(array.configuration) : undefined,
            array.server ? Server.fromArray(array.server) : undefined,
            array.last_check,
            array.status,
            array.last_error,
            array.createdAt,
            array.updatedAt
        )
    }

    toArray(): MonitorArray {
        return {
            name: this.name,
            type: this.type,
            is_enabled: this.isEnabled,
            configuration_object: JSON.stringify(this.configurationObject),
            id: this.id,
            configuration: this.configuration?.toArray(),
            server: this.server?.toArray(),
            last_check: this.lastCheck,
            status: this.status,
            last_error: this.lastError,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}