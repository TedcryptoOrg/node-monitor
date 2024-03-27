import Monitor from "../Monitor/Monitor";
import Server from "../Server/Server";

export default class Configuration {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly monitors: readonly Monitor[],
        public readonly servers: readonly Server[],
        public readonly isEnabled: boolean,
    ) {}

    withMonitors(monitors: Monitor[]): Configuration {
        return new Configuration(
            this.id,
            this.name,
            monitors,
            this.servers,
            this.isEnabled
        )
    }
}
