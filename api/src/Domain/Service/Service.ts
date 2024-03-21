import Server, {ServerArray} from "../Server/Server";

export type ServiceArray = {
    name: string,
    address: string,
    is_enabled: boolean,
    type: ServiceType,
    server: ServerArray,
    id?: number,
}

export default class Service {
    constructor(
        public name: string,
        public address: string,
        public is_enabled: boolean,
        public type: ServiceType,
        public server: Server,
        public id?: number,
    ) {
    }

    static fromArray(array: ServiceArray): Service {
        return new Service(
            array.name,
            array.address,
            array.is_enabled,
            array.type,
            Server.fromArray(array.server),
            array.id,
        );
    }

    toArray(): ServiceArray {
        return {
            name: this.name,
            address: this.address,
            is_enabled: this.is_enabled,
            type: this.type,
            server: this.server.toArray(),
            id: this.id,
        };
    }
}