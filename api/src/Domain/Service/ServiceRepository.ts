import Service from "./Service";

export type FindAllCriteria = {
    server_id?: number;
}

export default interface ServiceRepository {
    get(id: number): Promise<Service>

    findAll(criteria?: FindAllCriteria): Promise<Service[]>

    upsert(service: Service): Promise<Service>;

    delete(id: number): Promise<void>;

}