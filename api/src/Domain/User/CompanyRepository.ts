import Company from "./Company";

export default interface CompanyRepository {
    /**
     * @throws RecordNotFound
     */
    get(id: number): Promise<Company>;

    upsert(company: Company): Promise<Company>;

    delete(id: number): Promise<void>;

    findAll(): Promise<Company[]>;
}
