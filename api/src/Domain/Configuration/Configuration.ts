export type ConfigurationArray = {
    name: string
    chain: string
    is_enabled: boolean
    id?: number
    createdAt?: Date
    updatedAt?: Date
}

export default class Configuration {
    constructor(
        public name: string,
        public chain: string,
        public is_enabled: boolean,
        public id?: number,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {
    }

    static fromArray(array: ConfigurationArray): Configuration {
        return new Configuration(
            array.name,
            array.chain,
            array.is_enabled,
            array.id,
            array.createdAt,
            array.updatedAt
        );
    }

    toArray(): ConfigurationArray {
        return {
            name: this.name,
            chain: this.chain,
            is_enabled: this.is_enabled,
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
