import { inject, injectable } from 'inversify'
import BlockchainClient from '../../../Domain/Blockchain/BlockchainClient'
import CosmosBlockchainClient from './CosmosBlockchainClient'
import { RestCosmjsClient } from './Cosmjs/RestCosmjsClient'
import { ServiceType } from '../../../Domain/Services/ServiceType'
import { ChainDirectory } from '@tedcryptoorg/cosmos-directory'
import BlockchainClientFactory from '../../../Domain/Blockchain/BlockchainClientFactory'
import Configuration from '../../../Domain/Configuration/Configuration'
import Server from '../../../Domain/Server/Server'
import { RpcCosmjsClient } from './Cosmjs/RpcCosmjsClient'
import { TYPES } from '../../../Domain/DependencyInjection/types'
import Logger from '../../../Application/Logger/Logger'

@injectable()
export default class CosmosBlockchainClientFactory implements BlockchainClientFactory {
  private readonly chainDirectory: ChainDirectory
  private readonly cachedServers = new Map<string, string>()

  constructor (
    @inject(TYPES.Logger) private readonly logger: Logger
  ) {
    this.chainDirectory = new ChainDirectory()
  }

  async createPublicClientFromConfiguration (configuration: Configuration, type: ServiceType.RPC | ServiceType.REST): Promise<BlockchainClient> {
    if (this.cachedServers.get(`public-${configuration.chain}-${type}`) === undefined) {
      const address = await this.getPublicService(configuration.chain, type)
      this.cachedServers.set(`public-${configuration.chain}-${type}`, address)
    }

    return await this.getFromCache(`public-${configuration.chain}-${type}`, type, configuration.chain)
  }

  async createClientFromConfiguration (configuration: Configuration, type: ServiceType.RPC | ServiceType.REST): Promise<BlockchainClient> {
    if (this.cachedServers.get(`configuration-${configuration.id}-${type}`) === undefined) {
      const address = await this.getBestServerForService(configuration.servers, type) ??
                await this.getPublicService(configuration.chain, type)

      this.cachedServers.set(`configuration-${configuration.id}-${type}`, address)
    }

    return await this.getFromCache(`configuration-${configuration.id}-${type}`, type, configuration.chain)
  }

  async createClientFromServer (configuration: Configuration, server: Server, type: ServiceType.RPC | ServiceType.REST): Promise<BlockchainClient> {
    if (this.cachedServers.get(`server-${server.id}-${type}`) === undefined) {
      const address = await this.getBestServerForService([server], type)
      if (address === null) {
        this.logger.error('No service available for server', { server })
        throw new Error('No service available for server')
      }

      this.cachedServers.set(`server-${server.id}-${type}`, address)
    }

    return await this.getFromCache(`server-${server.id}-${type}`, type, configuration.chain)
  }

  private async getFromCache (key: string, type: string, chain: string): Promise<BlockchainClient> {
    const url = this.cachedServers.get(key)
    if (url === undefined) {
      this.logger.error('Public service not available', { key })
      throw new Error('Public service not available')
    }

    switch (type) {
      case ServiceType.REST:
        return new CosmosBlockchainClient(
          new RestCosmjsClient(url, this.logger),
          (await this.chainDirectory.getChainData(chain)).chain
        )
      case ServiceType.RPC:
        return new CosmosBlockchainClient(
          new RpcCosmjsClient(url),
          (await this.chainDirectory.getChainData(chain)).chain
        )
    }

    throw new Error(`Cannot create client for ${type}`)
  }

  private async getBestServerForService (servers: readonly Server[], serviceType: ServiceType): Promise<string | null> {
    for (const server of servers) {
      for (const service of server.services) {
        if (!service.isEnabled) {
          continue
        }
        if (service.type === serviceType) {
          return service.address
        }
      }
    }

    this.logger.error('Falling to public services because servers are not available. Are they disabled?', { servers, serviceType })

    return null
  }

  private async getPublicService (chain: string, serviceType: ServiceType): Promise<string> {
    switch (serviceType) {
      case ServiceType.REST:
        return `https://rest.cosmos.directory/${chain}`
      case ServiceType.RPC:
        return `https://rpc.cosmos.directory/${chain}`
    }

    throw new Error(`Cannot use public services for ${serviceType.toString()}`)
  }
}
