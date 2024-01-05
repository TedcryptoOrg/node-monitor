export type ApiServer = {
    id?: number,
    name: string,
    address: string,
    is_enabled: boolean,
    configuration_id: number,
    createdAt?: Date;
    updatedAt?: Date;
}
