import BlockchainClient from "../../../src/Domain/Blockchain/BlockchainClient";

export default class StubBlockchainClient implements BlockchainClient {
    async fetchOracleMissCounter(chain: string, validatorAddress: string): Promise<number> {
        return 10
    }

    async isSyncing(): Promise<boolean> {
        return false
    }

    async getBlockHeight(): Promise<number> {
        return 200
    }

    async fetchMissCounter(validatorAddress: string): Promise<number> {
        return 10
    }
}
