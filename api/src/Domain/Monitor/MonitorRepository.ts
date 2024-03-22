import Monitor from "./Monitor";

export type MonitorFindAllProps = {
    configuration_id?: number;
}

export default interface MonitorRepository {
    /**
     * @throws RecordNotFound
     */
    get(id: number): Promise<Monitor>;

    upsert(monitor: Monitor): Promise<Monitor>;

    delete(id: number): Promise<void>;

    findAll(criteria?: MonitorFindAllProps): Promise<Monitor[]>;
}