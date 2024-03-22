import Server from "./Server";

export type FindAllCriteria = {
    configuration_id?: number
}

export default interface ServerRepository {
    /**
     * @throws RecordNotFound
     */
    get(id: number): Promise<Server>

    upsert(server: Server): Promise<Server>

    delete(id: number): Promise<void>;

    findAll(criteria?: FindAllCriteria): Promise<Server[]>;
}