import {injectable} from "inversify";
import BlockchainClient from "../../../Domain/Blockchain/BlockchainClient";
import CosmosBlockchainClient from "./CosmosBlockchainClient";
import {RestCosmjsClient} from "./Cosmjs/RestCosmjsClient";
import {ServiceType} from "../../../Domain/Services/ServiceType";
import {ChainDirectory} from "@tedcryptoorg/cosmos-directory";
import BlockchainClientFactory from "../../../Domain/Blockchain/BlockchainClientFactory";
import Configuration from "../../../Domain/Configuration/Configuration";
import Server from "../../../Domain/Server/Server";
import {RpcCosmjsClient} from "./Cosmjs/RpcCosmjsClient";

@injectable()
export default class CosmosBlockchainClientFactory implements BlockchainClientFactory {
    private chainDirectory: ChainDirectory
    private cachedServers = new Map<string, string>

    constructor() {
        this.chainDirectory = new ChainDirectory()
    }

    async createPublicClientFromConfiguration(configuration: Configuration, type: ServiceType.RPC | ServiceType.REST): Promise<BlockchainClient> {
        if (!this.cachedServers.get(`public-${configuration.chain}-${type}`)) {
            const address = await this.getPublicService(configuration.chain, type)
            this.cachedServers.set(`public-${configuration.chain}-${type}`, address)
        }

        switch (type) {
            case ServiceType.REST:
                return new CosmosBlockchainClient(
                    new RestCosmjsClient(this.cachedServers.get(`public-${configuration.chain}-${type}`) as string),
                    (await this.chainDirectory.getChainData(configuration.chain)).chain
                )
            case ServiceType.RPC:
                return new CosmosBlockchainClient(
                    new RpcCosmjsClient(this.cachedServers.get(`public-${configuration.chain}-${type}`) as string),
                    (await this.chainDirectory.getChainData(configuration.chain)).chain
                )
        }
    }

    async createClientFromConfiguration(configuration: Configuration, type: ServiceType.RPC | ServiceType.REST): Promise<BlockchainClient> {
        if (!this.cachedServers.get(`configuration-${configuration.id}-${type}`)) {
            const address = await this.getBestServerForService(configuration.servers, type)
                ?? await this.getPublicService(configuration.chain, type)

            this.cachedServers.set(`configuration-${configuration.id}-${type}`, address)
        }

        switch (type) {
            case ServiceType.REST:
                return new CosmosBlockchainClient(
                    new RestCosmjsClient(this.cachedServers.get(`configuration-${configuration.id}-${type}`) as string),
                    (await this.chainDirectory.getChainData(configuration.chain)).chain
                )
            case ServiceType.RPC:
                return new CosmosBlockchainClient(
                    new RpcCosmjsClient(this.cachedServers.get(`configuration-${configuration.id}-${type}`) as string),
                    (await this.chainDirectory.getChainData(configuration.chain)).chain
                )
        }
    }

    async createClientFromServer(configuration: Configuration, server: Server, type: ServiceType.RPC | ServiceType.REST): Promise<BlockchainClient> {
        if (!this.cachedServers.get(`server-${server.id}-${type}`)) {
            const address = await this.getBestServerForService([server], type)
            if (address === null) {
                throw new Error('No service available for server')
            }

            this.cachedServers.set(`server-${server.id}-${type}`, address)
        }

        switch (type) {
            case ServiceType.REST:
                return new CosmosBlockchainClient(
                    new RestCosmjsClient(this.cachedServers.get(`server-${server.id}-${type}`) as string),
                    (await this.chainDirectory.getChainData(configuration.chain)).chain
                )
            case ServiceType.RPC:
                return new CosmosBlockchainClient(
                    new RpcCosmjsClient(this.cachedServers.get(`server-${server.id}-${type}`) as string),
                    (await this.chainDirectory.getChainData(configuration.chain)).chain
                )
        }
    }

    private async getBestServerForService(servers: readonly Server[], serviceType: ServiceType): Promise<string|null> {
        for(const server of servers) {
            for(const service of server.services) {
                if (!service.isEnabled) {
                    continue
                }
                if (service.type === serviceType) {
                    return service.address
                }
            }
        }

        console.error('Falling to public services because servers are not available. Are they disabled?')

        return null
    }

    private async getPublicService(chain: string, serviceType: ServiceType): Promise<string> {
        switch (serviceType) {
            case ServiceType.REST:
                return `https://rest.cosmos.directory/${chain}`
            case ServiceType.RPC:
                return `https://rpc.cosmos.directory/${chain}`
        }

        throw new Error(`Cannot use public services for ${serviceType.toString()}`)
    }
}
