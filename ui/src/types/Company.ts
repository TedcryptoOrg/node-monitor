export type CompanyInput = {
    name: string
    is_active: boolean
}

export type Company = {
    id: number
    name: string
    is_active: boolean
    created_at?: Date
    updated_at?: Date
}