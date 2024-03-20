import Configuration from "./Configuration";

export default interface ConfigurationRepository {
    /**
     * @throws RecordNotFound
     */
    get(id: number): Promise<Configuration>;

    findAll(): Promise<Configuration[]>;

    upsert(configuration: Configuration): Promise<Configuration>;

    delete(id: number): Promise<void>;
}
