import BlockchainClient from "../../../src/Domain/Blockchain/BlockchainClient";
import BlockchainClientFactory from "../../../src/Domain/Blockchain/BlockchainClientFactory";
import Configuration from "../../../src/Domain/Configuration/Configuration";
import Server from "../../../src/Domain/Server/Server";
import { ServiceType } from "../../../src/Domain/Services/ServiceType";

export default class InMemoryBlockchainClientFactory implements BlockchainClientFactory {
    private restClient?: BlockchainClient
    private rpcClient?: BlockchainClient

    addRestClient(client: BlockchainClient) {
        this.restClient = client
    }

    addRpcClient(client: BlockchainClient) {
        this.rpcClient = client
    }

    async createPublicClientFromConfiguration(configuration: Configuration, type: ServiceType.RPC | ServiceType.REST): Promise<BlockchainClient> {
        if (type === ServiceType.RPC) {
            return this.rpcClient!
        }

        return this.restClient!
    }

    async createClientFromConfiguration(configuration: Configuration, type: ServiceType.RPC | ServiceType.REST): Promise<BlockchainClient> {
        if (type === ServiceType.RPC) {
            return this.rpcClient!
        }

        return this.restClient!
    }

    async createClientFromServer(configuration: Configuration, server: Server, type: ServiceType.RPC | ServiceType.REST): Promise<BlockchainClient> {
        if (type === ServiceType.RPC) {
            return this.rpcClient!
        }

        return this.restClient!
    }
}
