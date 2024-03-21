import Server from "./Server";

export default interface ServerRepository {
    /**
     * @throws RecordNotFound
     */
    get(id: number): Promise<Server>

    upsert(server: Server): Promise<Server>

    delete(id: number): Promise<void>;

    findAll(): Promise<Server[]>;
}