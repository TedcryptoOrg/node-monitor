export default interface BlockchainClient {
    fetchMissCounter(validatorAddress: string): Promise<number>;
}
