import User from "./User";

export default interface UserRepository {
    /**
     * @throws RecordNotFound
     */
    get(id: number): Promise<User>;

    /**
     * @throws RecordNotFound
     */
    getByUsername(username: string): Promise<User>

    findByUsername(username: string): Promise<User|null>

    upsert(user: User): Promise<User>;

    delete(id: number): Promise<void>;

    findAll(): Promise<User[]>;
}
