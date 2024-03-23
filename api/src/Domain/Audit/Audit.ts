import Configuration, {ConfigurationArray} from "../Configuration/Configuration";
import Monitor, {MonitorArray} from "../Monitor/Monitor";
import Server, {ServerArray} from "../Server/Server";

export type AuditArray = {
    message: string
    configuration?: ConfigurationArray|null
    monitor?: MonitorArray|null
    server?: ServerArray|null
    id?: number
    created_at?: Date
}
export default class Audit {
    constructor(
        public configuration: Configuration|null,
        public server: Server|null,
        public monitor: Monitor|null,
        public message: string,
        public id?: number,
        public createdAt?: Date,
    ) {}

    static fromArray(audit: AuditArray): Audit {
        return new Audit(
            audit.configuration ? Configuration.fromArray(audit.configuration) : null,
            audit.server ? Server.fromArray(audit.server) : null,
            audit.monitor ? Monitor.fromArray(audit.monitor) : null,
            audit.message,
            audit.id,
            audit.created_at
        )
    }

    toArray(): AuditArray {
        return {
            monitor: this.monitor?.toArray() ?? null,
            server: this.server?.toArray() ?? null,
            configuration: this.configuration?.toArray() ?? null,
            message: this.message,
            id: this.id,
            created_at: this.createdAt
        }
    }
}