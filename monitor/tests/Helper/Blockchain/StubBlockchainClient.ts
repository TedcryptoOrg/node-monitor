import BlockchainClient from "../../../src/Domain/Blockchain/BlockchainClient";

export default class StubBlockchainClient implements BlockchainClient {

    async fetchMissCounter(validatorAddress: string): Promise<number> {
        return 10;
    }
}