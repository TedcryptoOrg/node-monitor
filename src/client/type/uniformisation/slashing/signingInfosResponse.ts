export type SigningInfosResponse = {
    val_signing_info: {
        address: string
        start_height: string
        index_offset: string
        jailed_until: string
        tombstoned: boolean
        missed_blocks_counter: string
    }
}