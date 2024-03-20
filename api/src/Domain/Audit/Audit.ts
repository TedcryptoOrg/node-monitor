import Configuration, {ConfigurationArray} from "../Configuration/Configuration";

export type AuditArray = {
    monitor_id: number|null
    server_id: number|null
    message: string
    configuration?: ConfigurationArray
    id?: number
    created_at?: Date
}
export default class Audit {
    constructor(
        public configuration: Configuration|null,
        public server: null,
        public monitor: null,
        public message: string,
        public id?: number,
        public createdAt?: Date,
    ) {}

    static fromArray(audit: AuditArray): Audit {
        return new Audit(
            audit.configuration ? Configuration.fromArray(audit.configuration) : null,
            null,
            null,
            audit.message,
            audit.id,
            audit.created_at
        )
    }

    toArray(): AuditArray {
        return {
            monitor_id: null,
            server_id: null,
            configuration: this.configuration?.toArray(),
            message: this.message,
            id: this.id,
            created_at: this.createdAt
        }
    }
}