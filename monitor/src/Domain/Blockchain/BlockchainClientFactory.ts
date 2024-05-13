import type BlockchainClient from './BlockchainClient'
import type Configuration from '../Configuration/Configuration'
import type Server from '../Server/Server'
import { type ServiceType } from '../Services/ServiceType'

export default interface BlockchainClientFactory {
  /**
     * Create a client from public nodes
     */
  createPublicClientFromConfiguration: (configuration: Configuration, type: ServiceType.RPC | ServiceType.REST) => Promise<BlockchainClient>

  createClientFromConfiguration: (configuration: Configuration, type: ServiceType.RPC | ServiceType.REST) => Promise<BlockchainClient>

  createClientFromServer: (configuration: Configuration, server: Server, type: ServiceType.RPC | ServiceType.REST) => Promise<BlockchainClient>
}
