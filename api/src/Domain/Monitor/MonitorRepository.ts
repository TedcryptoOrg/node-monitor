import Monitor from "./Monitor";

export default interface MonitorRepository {
    /**
     * @throws RecordNotFound
     */
    get(id: number): Promise<Monitor>;

    upsert(monitor: Monitor): Promise<Monitor>;

    delete(id: number): Promise<void>;

    findAll(): Promise<Monitor[]>;
}