import Company, {CompanyArray} from "./Company";

export type UserArray = {
    username: string,
    is_active: boolean,
    is_admin: boolean,
    is_super_admin: boolean,
    company: CompanyArray|undefined,
    password?: string,
    raw_password?: string,
    id?: number|undefined,
    created_at?: Date|undefined,
    updated_at?: Date|undefined
}

export default class User {
    constructor(
        public username: string,
        public is_active: boolean,
        public is_admin: boolean,
        public is_super_admin: boolean,
        public company: Company|undefined,
        public password: string|undefined,
        public raw_password?: string,
        public id?: number|undefined,
        public created_at?: Date|undefined,
        public updated_at?: Date|undefined
    ) {
    }

    public static fromObject(object: UserArray): User {
        return new User(
            object.username,
            object.is_active,
            object.is_admin,
            object.is_super_admin,
            object.company ? Company.fromObject(object.company) : undefined,
            object.password,
            object.raw_password,
            object.id,
            object.created_at,
            object.updated_at
        )
    }

    public toObject(): UserArray {
        return {
            username: this.username,
            is_active: this.is_active,
            is_admin: this.is_admin,
            is_super_admin: this.is_super_admin,
            company: this.company ? this.company.toObject() : undefined,
            id: this.id,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}