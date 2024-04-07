import {Company} from "./Company";

export type UserInput = {
    username: string
    is_active: boolean
    is_admin: boolean
    is_super_admin: boolean
    raw_password?: string,
    company_id: number,
}

export type User = {
    id: number
    username: string
    is_active: boolean
    is_admin: boolean
    is_super_admin: boolean
    company: Company,
    raw_password?: string
    created_at?: Date
    updated_at?: Date
}