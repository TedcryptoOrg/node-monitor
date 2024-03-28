import BlockchainClient from "../../../src/Domain/Blockchain/BlockchainClient";
import BlockchainClientFactory from "../../../src/Domain/Blockchain/BlockchainClientFactory";

export default class InMemoryBlockchainClientFactory implements BlockchainClientFactory {
    private restClient?: BlockchainClient
    private rpcClient?: BlockchainClient

    addRestClient(client: BlockchainClient) {
        this.restClient = client
    }

    async createRestClient(chain: string, configurationId: number): Promise<BlockchainClient> {
        if (this.restClient === undefined) {
            throw new Error('Rest client not set')
        }

        return this.restClient
    }

    addRpcClient(client: BlockchainClient) {
        this.rpcClient = client
    }

    async createRpcClient(chain: string, configurationId: number): Promise<BlockchainClient> {
        if (this.rpcClient === undefined) {
            throw new Error('Rpc client not set')
        }

        return this.rpcClient
    }
}
