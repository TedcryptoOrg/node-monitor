export default interface BlockchainClient {
    isSyncing(): Promise<boolean>

    getBlockHeight(): Promise<number>

    fetchMissCounter(validatorAddress: string): Promise<number>

    fetchOracleMissCounter(chain: string, validatorAddress: string): Promise<number>
}
