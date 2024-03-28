import BlockchainClient from "./BlockchainClient";

export default interface BlockchainClientFactory {
    createRestClient(chain: string, configurationId: number): Promise<BlockchainClient>
    createRpcClient(chain: string, configurationId: number): Promise<BlockchainClient>
}
