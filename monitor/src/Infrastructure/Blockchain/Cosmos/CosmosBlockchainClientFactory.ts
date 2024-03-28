import {inject, injectable} from "inversify";
import BlockchainClient from "../../../Domain/Blockchain/BlockchainClient";
import CosmosBlockchainClient from "./CosmosBlockchainClient";
import {RestCosmjsClient} from "./Cosmjs/RestCosmjsClient";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import ApiClient from "../../../Domain/ApiClient";
import {ServiceType} from "../../../Domain/Services/ServiceType";
import {ChainDirectory} from "@tedcryptoorg/cosmos-directory";
import BlockchainClientFactory from "../../../Domain/Blockchain/BlockchainClientFactory";

@injectable()
export default class CosmosBlockchainClientFactory implements BlockchainClientFactory {
    private chainDirectory: ChainDirectory
    private cachedServers = new Map<string, string>

    constructor(
        @inject(TYPES.ApiClient) private readonly apiClient: ApiClient
    ) {
        this.chainDirectory = new ChainDirectory()
    }

    async createRestClient(chain: string, configurationId: number): Promise<BlockchainClient> {
        return new CosmosBlockchainClient(
            new RestCosmjsClient(await this.getBestServerForService(configurationId, chain, ServiceType.REST)),
            (await this.chainDirectory.getChainData(chain)).chain
        )
    }

    async createRpcClient(chain: string, configurationId: number): Promise<BlockchainClient> {
        return new CosmosBlockchainClient(
            new RestCosmjsClient(await this.getBestServerForService(configurationId, chain, ServiceType.RPC)),
            (await this.chainDirectory.getChainData(chain)).chain
        )
    }

    private async getBestServerForService(configurationId: number, chain: string, serviceType: ServiceType): Promise<string> {
        if (this.cachedServers.has(`${configurationId}-${serviceType}`)) {
            return this.cachedServers.get(`${configurationId}-${serviceType}`) as string
        }

        const servers = await this.apiClient.getConfigurationServers(configurationId)
        for(const server of servers) {
            for(const service of server.services) {
                if (!service.isEnabled) {
                    continue
                }
                if (service.type === serviceType) {
                    this.cachedServers.set(`${configurationId}-${serviceType}`, service.address)
                    return service.address
                }
            }
        }

        console.error('Falling to public services because servers are not available. Are they disabled?')

        switch (serviceType) {
            case ServiceType.REST:
                return `https://rest.cosmos.directory/${chain}`
            case ServiceType.RPC:
                return `https://rpc.cosmos.directory/${chain}`
        }

        throw new Error(`Cannot use public services for ${serviceType.toString()}`)
    }
}
