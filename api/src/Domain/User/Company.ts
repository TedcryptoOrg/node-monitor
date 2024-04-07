import User, {UserArray} from "./User";

export type CompanyArray = {
    name: string,
    is_active: boolean,
    users: UserArray[],
    id?: number|undefined,
    created_at?: Date|undefined,
    updated_at?: Date|undefined
}

export default class Company {
    constructor(
        public name: string,
        public is_active: boolean,
        public users: User[],
        public id?: number|undefined,
        public created_at?: Date|undefined,
        public updated_at?: Date|undefined
    ) {
    }

    public static fromObject(object: CompanyArray): Company {
        return new Company(
            object.name,
            object.is_active,
            object.users ? object.users.map(user => User.fromObject(user)) : [],
            object.id,
            object.created_at,
            object.updated_at
        )
    }

    public toObject(): CompanyArray {
        return {
            name: this.name,
            is_active: this.is_active,
            users: this.users.map(user => user.toObject()),
            id: this.id,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}